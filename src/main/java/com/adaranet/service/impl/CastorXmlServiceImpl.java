package com.adaranet.service.impl;

import java.util.ArrayList;
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
import com.adaranet.xml.xmlWrappers.Connections;
import com.adaranet.xml.xmlWrappers.ConnectionsWrapper;

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
				Device foundDevice = deviceService.findDeviceByDeviceName(device.getDeviceName());
				if(foundDevice == null) {
					template.save(device);
					logger.info("Device with Name : "+device.getDeviceName()+" : is Successfully Created/Persisted in Neo4j!");
				} else {
					logger.info("Device with Name : "+foundDevice.getDeviceName()+" : Already Exists in Neo4j! Cannot create it once agian!");
				}
			}
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("BAD_REQUEST : Check Data Format of the XML!", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<String>("Success, Device(s) Saved in Neo4j", HttpStatus.OK);
	}
	
	@Transactional
	public ResponseEntity<String> updateDevicesFromXml(DeviceXmlMapper deviceXmlMapper) {
		try {
			//logger.info("Device Name : Converted from XML to Object Successfully : Device Name : "+device.getDeviceName());
			List<Device> devices = deviceXmlMapper.getDevices();
			logger.info("DeviceXmlMapper : Mapped Devices ArrayList : Size : "+devices.size());
			for (Device device : devices) {		
				logger.info("Updating New Device : in Neo4j : Having Device Name : "+device.getDeviceName());
				Device foundDevice = deviceService.findDeviceByDeviceName(device.getDeviceName());
				if(foundDevice != null) {
					foundDevice.setCpuUtilization(device.getCpuUtilization());
					foundDevice.setDeviceType(device.getDeviceType());
					foundDevice.setNumberOfSessions(device.getNumberOfSessions());
					//deviceService.saveEntity(device);
					template.save(foundDevice);
					logger.info("Updated Device : "+foundDevice.getDeviceName()+" : Succesfully!");
				} else {
					logger.info("No Device Exists in Neo4j with Name : "+device.getDeviceName());
				}
			}
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("BAD_REQUEST : Check Data Format of the XML!", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<String>("Success, Device(s) Updated in Neo4j", HttpStatus.OK);
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
						Port foundPort = portService.findPortByPortName(uniquePortName);
						logger.info("FOUND PORTTTTTTTTT : "+foundPort);
						if(foundPort == null) {
							logger.info("Should not execute this if Found Port != null");
							logger.info("The Port with PortName : "+uniquePortName+" : DoesNotExist in Neo4j.. So, we can persist it.");
							Port newPort = new Port(uniquePortName, port.getPortType(), port.getPacketsIn(), port.getPacketsOut(), port.getBitsIn(), port.getBitsOut());
							template.save(newPort);
							HasPort hasPort = new HasPort(foundDevice, newPort);
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
		return new ResponseEntity<String>("Success, Ports Saved in Neo4j", HttpStatus.OK);
	}
	
	
	@Transactional
	public ResponseEntity<String> updatePortsFromXml(PortXmlMapper portXmlMapper) {
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
						Port foundPort = portService.findPortByPortName(uniquePortName);
						logger.info("FOUND PORTTTTTTTTT : "+foundPort);
						if(foundPort == null) {
							logger.info("The Port with PortName : "+uniquePortName+" : DoesNotExist in Neo4j..");
						} else {
							logger.info("The Port with PortName : "+uniquePortName+" : Already Exists in Neo4j.");
							logger.info("Updating Port!");
							foundPort.setBitsIn(port.getBitsIn());
							foundPort.setBitsOut(port.getBitsOut());
							foundPort.setPacketsIn(port.getPacketsIn());
							foundPort.setPacketsOut(port.getPacketsOut());
							foundPort.setPortType(port.getPortType());
							template.save(foundPort);
							logger.info("Port : "+foundPort.getPortName()+" : Successfully Updated!");
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
		return new ResponseEntity<String>("Success, Ports Saved in Neo4j", HttpStatus.OK);
	}
	

	@SuppressWarnings("finally")
	@Transactional
	public ResponseEntity<String> connectDevicePortsFromXml(ConnectionsWrapper connectionsWrapper) {
		//TODO: Need to configure this guy!
		logger.info("Comes inside ConnectDevicePortsFromXml() method.... Need to configure this guy!");
		String errors = "";
		int count = 0;
		try {
			Set<Connections> connections = connectionsWrapper.getConnections();
			for (Connections connection : connections) {
				Device sDevice = connection.getSourceDevice();
				Device dDevice = connection.getDestinationDevice();
				if(!sDevice.getDeviceName().equals(dDevice.getDeviceName())) {
					Device sourceDevice = deviceService.findDeviceByDeviceName(sDevice.getDeviceName());
					Device destinationDevice = deviceService.findDeviceByDeviceName(dDevice.getDeviceName());
					if((null != sourceDevice && null != destinationDevice) && (!sDevice.getHasPorts().isEmpty() && !dDevice.getHasPorts().isEmpty())) {
						logger.info("SDevice.getHasPorts size : "+sDevice.getHasPorts().size());
						String sourcePortName = sDevice.getHasPorts().iterator().next().getConnectedPort().getPortName();
						String destPortName = dDevice.getHasPorts().iterator().next().getConnectedPort().getPortName();
						Port sourcePort = portService.findPortByPortName((sourceDevice.getDeviceName())+"-"+(sourcePortName));
						Port destinationPort = portService.findPortByPortName((destinationDevice.getDeviceName())+"-"+(destPortName));
						if(null != sourcePort && null != destinationPort) {
							sourcePort.connectsToPort(destinationPort);
							template.save(sourcePort);
							logger.info("Port : "+sourcePort.getPortName()+" : is Successfully Connected to : "+destinationPort.getPortName());
						} else {
						logger.info("Either Source Port or Destination Port is NULL!");	
						errors += ++count+") Could not find Either, Source Port : "+sourcePortName+" : or Destination Port :"+destPortName+"\n";
						//return new ResponseEntity<String>("BAD_REQUEST : Either Source Port or Destination Port is NULL!", HttpStatus.BAD_REQUEST);
						}
					} else {
						logger.info("Either, source Device/ Dest. device == null or sdevice/ddevice's hasports set is EMPTY.");
						errors += ++count+") Could not find Either, Source Device : "+sDevice.getDeviceName()+" : Or Destination Device : "+dDevice.getDeviceName()+"\n";
						//return new ResponseEntity<String>("BAD_REQUEST : Either, source Device/ Dest. device == null or sdevice/ddevice's hasports set is EMPTY!", HttpStatus.BAD_REQUEST);
					}
			   } else {
				   logger.info("Source Device : "+sDevice.getDeviceName()+ " : CAN NOT be equal to : Destination Device : "+dDevice.getDeviceName());
				   errors += ++count+") Source Device : "+sDevice.getDeviceName()+ " : CAN NOT be equal to : Destination Device : "+dDevice.getDeviceName()+"\n";
			   }
		  }
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			logger.info("ERROR IS : "+errors);
			if(errors != "" || !errors.equals(""))
				return new ResponseEntity<String>(errors, HttpStatus.OK);
				//return new ResponseEntity<String>(errors, HttpStatus.BAD_REQUEST);
			
			return new ResponseEntity<String>("OK, All Device-Ports Specified in the XML are Connected Successfully!", HttpStatus.OK);
		}
	}
}

