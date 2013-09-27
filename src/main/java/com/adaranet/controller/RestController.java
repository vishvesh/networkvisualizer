package com.adaranet.controller;

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

	
	/**
	 * Create Devices
	 * @param xml
	 * @return
	 * @throws Exception
	 */
	//@RequestMapping(value = "device/create", method=RequestMethod.POST, consumes = {MediaType.APPLICATION_XML_VALUE}, produces = {MediaType.APPLICATION_XML_VALUE})
    //@RequestMapping(value = "device/create", method=RequestMethod.POST, consumes = {MediaType.APPLICATION_XML_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
	//Request Headers should have : Content-Type:application/xml;
	@RequestMapping(value = "devices/createDevices", 
					method=RequestMethod.POST, 
					headers = "Accept=application/xml", 
					consumes = {MediaType.APPLICATION_XML_VALUE})
	public ResponseEntity<String> createDevicesFromXml(@RequestBody Source xml) throws Exception {
		DeviceXmlMapper deviceXmlMapper = null;
		try {
			logger.info("Inside createDevicesFromXml() : XML is : "+xml);
			deviceXmlMapper = (DeviceXmlMapper) CastorXmlMapperUtils.convertFromXMLToObjectFromInputSource(xml);
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("BAD_REQUEST : Check Data Format of the XML!", HttpStatus.BAD_REQUEST);
		}
		return castorXmlService.createDevicesFromXml(deviceXmlMapper);
	}
	
	
	/**
	 * Update Devices
	 * @param xml
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "devices/updateDevices", 
			method=RequestMethod.POST, 
			headers = "Accept=application/xml", 
			consumes = {MediaType.APPLICATION_XML_VALUE})
	public ResponseEntity<String> updateDevicesFromXml(@RequestBody Source xml) throws Exception {
		DeviceXmlMapper deviceXmlMapper = null;
		try {
			logger.info("Inside updateDevicesFromXml() : XML is : "+xml);
			deviceXmlMapper = (DeviceXmlMapper) CastorXmlMapperUtils.convertFromXMLToObjectFromInputSource(xml);
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("BAD_REQUEST : Check Data Format of the XML!", HttpStatus.BAD_REQUEST);
		}
		return castorXmlService.updateDevicesFromXml(deviceXmlMapper);
	}
	
	
	/**
	 * Create Ports for Device(s)
	 * @param xml
	 * @return
	 * @throws Exception
	 */
	//Request Headers should have : Content-Type:application/xml;
	@RequestMapping(value = "ports/createPorts", 
					method=RequestMethod.POST, 
					headers = "Accept=application/xml", 
					consumes = {MediaType.APPLICATION_XML_VALUE})
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
	
	
	/**
	 * Create Ports for Device(s)
	 * @param xml
	 * @return
	 * @throws Exception
	 */
	//Request Headers should have : Content-Type:application/xml;
	@RequestMapping(value = "ports/updatePorts", 
					method=RequestMethod.POST, 
					headers = "Accept=application/xml", 
					consumes = {MediaType.APPLICATION_XML_VALUE})
	public ResponseEntity<String> updatePortsFromXml(@RequestBody Source xml) throws Exception {
		PortXmlMapper portXmlMapper = null;
		try {
			logger.info("Inside updatePortsFromXml() : XML is : "+xml);
			portXmlMapper = (PortXmlMapper) CastorXmlMapperUtils.convertFromXMLToObjectFromInputSource(xml);
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("BAD_REQUEST : Check Data Format of the XML!", HttpStatus.BAD_REQUEST);
		}
		return castorXmlService.updatePortsFromXml(portXmlMapper);
	}
	
	
	/**
	 * Connect Existing Device Ports!
	 * @param xml
	 * @return
	 * @throws Exception
	 */
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
