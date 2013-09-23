package com.adaranet.controller;

import java.util.ArrayList;
import java.util.List;

import javax.xml.transform.Source;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.adaranet.service.CastorXmlService;
import com.adaranet.xml.CastorXmlMapperUtils;
import com.adaranet.xml.DeviceXmlMapper;
import com.adaranet.xml.PortXmlMapper;
import com.adaranet.xml.xmlWrappers.Connections;
import com.adaranet.xml.xmlWrappers.ConnectionsWrapper;

@Controller
public class RestController {
	
	private Logger logger = Logger.getLogger(getClass());
	
	/*@Autowired
	private DeviceService deviceService;
	@Autowired
	private PortService portService;
	@Autowired
	private Neo4jTemplate template;*/
	@Autowired
	private CastorXmlService castorXmlService;

	//@RequestMapping(value = "device/create", method=RequestMethod.POST, consumes = {MediaType.APPLICATION_XML_VALUE}, produces = {MediaType.APPLICATION_XML_VALUE})
    //@RequestMapping(value = "device/create", method=RequestMethod.POST, consumes = {MediaType.APPLICATION_XML_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
	//Request Headers should have : Content-Type:application/xml;
	@RequestMapping(value = "devices/createDevices", method=RequestMethod.POST, headers = "Accept=application/xml", consumes = {MediaType.APPLICATION_XML_VALUE})
	public ResponseEntity<String> createDevicesFromXml(@RequestBody Source xml) throws Exception {
		DeviceXmlMapper deviceXmlMapper = null;
		try {
			logger.info("Inside createDeviceFromXml() : XML is : "+xml);
			deviceXmlMapper = (DeviceXmlMapper) CastorXmlMapperUtils.convertFromXMLToObjectFromInputSource(xml);
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("BAD_REQUEST : Check Data Format of the XML!", HttpStatus.BAD_REQUEST);
		}
		return castorXmlService.createDevicesFromXml(deviceXmlMapper);
	}
	
	//Request Headers should have : Content-Type:application/xml;
	@RequestMapping(value = "ports/createPortsForDevice", method=RequestMethod.POST, headers = "Accept=application/xml", consumes = {MediaType.APPLICATION_XML_VALUE})
	public ResponseEntity<String> createPortsFromXml(@RequestBody Source xml) throws Exception {
		PortXmlMapper portXmlMapper = null;
		try {
			logger.info("Inside createDeviceFromXml() : XML is : "+xml);
			portXmlMapper = (PortXmlMapper) CastorXmlMapperUtils.convertFromXMLToObjectFromInputSource(xml);
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("BAD_REQUEST : Check Data Format of the XML!", HttpStatus.BAD_REQUEST);
		}
		return castorXmlService.createPortsFromXml(portXmlMapper);
	}
	
	//Request Headers should have : Content-Type:application/xml;
	@RequestMapping(value = "ports/connectDevicePorts", 
					method=RequestMethod.POST, 
					headers = "Accept=application/xml", 
					consumes = {MediaType.APPLICATION_XML_VALUE})
	public ResponseEntity<String> connectDevicePorts(@RequestBody Source xml) throws Exception {
		//ConnectDevicePortsXmlMapper connectDevicePortsXmlMapper = null;
		ConnectionsWrapper connectionsWrapper = null;
		try {
			logger.info("Inside connectDevicePorts() : XML is : "+xml);
			connectionsWrapper = (ConnectionsWrapper) CastorXmlMapperUtils.convertFromXMLToObjectFromInputSource(xml);
			logger.info("Set Size :::::: "+connectionsWrapper.getConnections().size());
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
		}
		return castorXmlService.connectDevicePortsFromXml(connectionsWrapper);
	}
	
	/*@RequestMapping(value = "/createDevicesAndPortsXml")
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
	}*/

}
