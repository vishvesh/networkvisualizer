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
import com.adaranet.xml.CastorXmlMapper;
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

	@RequestMapping(value = "/createxml")
	public String createXml() throws Exception {
    	try {
    		logger.info("Now to map OBJ to XML for Devices!");
    		List<Device> allDevices = (List<Device>) IteratorUtil.asCollection(deviceService.findAll());
    		CastorXmlMapper.convertFromObjectToXMLFile(allDevices, "devices.xml");
    		
    		logger.info("Now to map OBJ to XML for Ports!");
    		List<Port> allPorts = (List<Port>) IteratorUtil.asCollection(portService.findAll());
    		CastorXmlMapper.convertFromObjectToXMLFile(allPorts, "ports.xml");
    		
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
	
		@RequestMapping(value = "device/create", method=RequestMethod.POST, consumes = {MediaType.APPLICATION_XML_VALUE})
		public ResponseEntity<String> createDeviceFromXml(@RequestBody Source xml) throws Exception {
			DeviceXmlMapper deviceXmlMapper = null;
			try {
				logger.info("Inside createDeviceFromXml() : XML is : "+xml);
				deviceXmlMapper = (DeviceXmlMapper) CastorXmlMapper.convertFromXMLToObjectFromInputSource(xml);
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
			return new ResponseEntity<String>("OK, Device Saved in Neo4j", HttpStatus.OK);
		}
	
}
