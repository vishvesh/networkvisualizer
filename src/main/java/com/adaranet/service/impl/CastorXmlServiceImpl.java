package com.adaranet.service.impl;

import java.util.List;
import java.util.Set;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.support.Neo4jTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.adaranet.model.Device;
import com.adaranet.model.Port;
import com.adaranet.relationships.HasPort;
import com.adaranet.service.CastorXmlService;
import com.adaranet.service.DeviceService;
import com.adaranet.service.PortService;
import com.adaranet.xml.DeviceXmlMapper;
import com.adaranet.xml.PortXmlMapper;

@Service
public class CastorXmlServiceImpl implements CastorXmlService {
	
	private Logger logger = Logger.getLogger(getClass());
	
	@Autowired
	private DeviceService deviceService;
	@Autowired
	private PortService portService;
	@Autowired
	private Neo4jTemplate template;
	
	@Transactional
	public ResponseEntity<String> createDevicesFromXml(DeviceXmlMapper deviceXmlMapper) {
		try {
			//logger.info("Device Name : Converted from XML to Object Successfully : Device Name : "+device.getDeviceName());
			List<Device> devices = deviceXmlMapper.getDevices();
			logger.info("DeviceXmlMapper : Mapped Devices ArrayList : Size : "+devices.size());
			for (Device device : devices) {		
				logger.info("Saving New Device : in Neo4j : Having Device Name : "+device.getDeviceName());
				deviceService.saveEntity(device);
			}
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("BAD_REQUEST : Check Data Format of the XML!", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<String>("Success, Device Saved in Neo4j", HttpStatus.OK);
	}
	
	@Transactional
	public ResponseEntity<String> createPortsFromXml(PortXmlMapper portXmlMapper) {
		long startTime = System.currentTimeMillis();
		logger.info("");
		logger.info("**********************************************************************************************");
		try {
			List<Device> devices = portXmlMapper.getDeviceHasPorts();
			logger.info("Devices List Size : "+devices.size());
			for (Device device : devices) {
				logger.info("Device Name : Converted from XML to Object Successfully : Device Name : "+device.getDeviceName());
				Device foundDevice = deviceService.findDeviceByDeviceName(device.getDeviceName());
				if(!(foundDevice == null)) {
					Set<Port> hasPorts = device.getDeviceHasPortsSetMappedByXml();
					logger.info("Has Ports Set Size : "+hasPorts.size());
					for (Port port : hasPorts) {
						logger.info("Connected Port Name : "+port.getPortName()+" : To Device : "+device.getDeviceName());
						String uniquePortName = device.getDeviceName()+"-"+port.getPortName();
						if(portService.findPortByPortName(uniquePortName) == null) {
							logger.info("The Port with PortName : "+uniquePortName+" : DoesNotExist in Neo4j.. So, we can persist it.");
							Port newPort = new Port();
							newPort.setPortName(port.getPortName());
							newPort.setPortType(port.getPortType());
							template.save(newPort);
							HasPort hasPort = new HasPort();
							hasPort.setStartDevice(foundDevice);
							hasPort.setConnectedPort(newPort);
							template.save(hasPort);
							logger.info("Configured Port : "+port.getPortName()+" : for Device : "+device.getDeviceName()+" : with HAS_PORT Relationship Successfully!");
						} else {
							logger.info("The Port with PortName : "+uniquePortName+" : Already Exists in Neo4j.");
						}
					}
				} else {
					logger.info("The Device with Name : "+device.getDeviceName()+" : Does not Exist in Neo4j.");
				}
			}
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("BAD_REQUEST : Check Data Format of the XML!", HttpStatus.BAD_REQUEST);
		}
		long endTime   = System.currentTimeMillis();
    	long totalTime = endTime - startTime;
    	logger.info("TIME TOOK FOR THE METHOD TO COMPLETE : "+totalTime+" : milli seconds");
		logger.info("**********************************************************************************************");
		logger.info("");
		return new ResponseEntity<String>("Success, Port Saved in Neo4j", HttpStatus.OK);
	}
}
