package com.adaranet.controller;

import java.io.IOException;
import java.util.List;

import javax.xml.transform.Source;

import org.apache.log4j.Logger;
import org.neo4j.helpers.collection.IteratorUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.support.Neo4jTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.adaranet.model.Device;
import com.adaranet.model.Port;
import com.adaranet.service.DeviceService;
import com.adaranet.service.PortService;
import com.adaranet.xml.CastorXmlMapperUtils;
import com.adaranet.xml.DeviceXmlMapper;

@Controller
public class RestController {
	
	private Logger logger = Logger.getLogger(getClass());
	
	@Autowired
	private DeviceService deviceService;
	@Autowired
	private PortService portService;
	@Autowired
	private Neo4jTemplate template;

	@RequestMapping(value = "/createDevicesAndPortsXml")
	public String createXml() throws Exception {
    	try {
    		logger.info("Now to map OBJ to XML for Devices!");
    		List<Device> allDevices = (List<Device>) IteratorUtil.asCollection(deviceService.findAll());
    		CastorXmlMapperUtils.convertFromObjectToXMLFile(allDevices, "devices.xml");
    		
    		logger.info("Now to map OBJ to XML for Ports!");
    		List<Port> allPorts = (List<Port>) IteratorUtil.asCollection(portService.findAll());
    		CastorXmlMapperUtils.convertFromObjectToXMLFile(allPorts, "ports.xml");
    		
		} catch (IOException e) {
			e.printStackTrace();
		}
      return "index";
	}
	
	//@RequestMapping(value = "device/create", method=RequestMethod.POST, consumes = {MediaType.APPLICATION_XML_VALUE}, produces = {MediaType.APPLICATION_XML_VALUE})
		/*@RequestMapping(value = "device/create", method=RequestMethod.POST, consumes = {MediaType.APPLICATION_XML_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
		public @ResponseBody Device createDeviceFromXml(@RequestBody Source xml) throws Exception {
			Device device = null;
			//DeviceDto dto = null;
			try {
				logger.info("XML is : "+xml);
				device = (Device) CastorXmlMapper.convertFromXMLToObject(xml);
				logger.info("Device Name : Converted from XML to Object Successfully : Device Name : "+device.getDeviceName());
				deviceService.saveEntity(device);
			} catch(Exception e) {
				e.printStackTrace();
			}
			return device;
		}*/
	
		//Request Headers should have : Content-Type:application/xml;
		@RequestMapping(value = "devices/create", method=RequestMethod.POST, headers = "Accept=application/xml", consumes = {MediaType.APPLICATION_XML_VALUE})
		public ResponseEntity<String> createDevicesFromXml(@RequestBody Source xml) throws Exception {
			DeviceXmlMapper deviceXmlMapper = null;
			try {
				logger.info("Inside createDeviceFromXml() : XML is : "+xml);
				deviceXmlMapper = (DeviceXmlMapper) CastorXmlMapperUtils.convertFromXMLToObjectFromInputSource(xml);
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
		
		//Request Headers should have : Content-Type:application/xml;
		@RequestMapping(value = "ports/create", method=RequestMethod.POST, headers = "Accept=application/xml", consumes = {MediaType.APPLICATION_XML_VALUE})
		public ResponseEntity<String> createPortsFromXml(@RequestBody Source xml) throws Exception {
			//TODO: To implement the mapper to create Ports for a particular/existing Device....
			/*DeviceXmlMapper deviceXmlMapper = null;
			try {
				logger.info("Inside createDeviceFromXml() : XML is : "+xml);
				deviceXmlMapper = (DeviceXmlMapper) CastorXmlMapperUtils.convertFromXMLToObjectFromInputSource(xml);
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
			}*/
			return new ResponseEntity<String>("Success, Port Saved in Neo4j", HttpStatus.OK);
		}
	
}
