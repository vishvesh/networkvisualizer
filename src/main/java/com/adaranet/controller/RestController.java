package com.adaranet.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.xml.transform.Source;

import org.apache.log4j.Logger;
import org.neo4j.helpers.collection.IteratorUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.support.Neo4jTemplate;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.adaranet.dto.DeviceDto;
import com.adaranet.model.Device;
import com.adaranet.model.Port;
import com.adaranet.service.DeviceService;
import com.adaranet.service.PortService;
import com.adaranet.xml.CastorXmlMapper;

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
    		CastorXmlMapper.convertFromObjectToXML(allDevices, "devices.xml");
    		
    		logger.info("Now to map OBJ to XML for Ports!");
    		List<Port> allPorts = (List<Port>) IteratorUtil.asCollection(portService.findAll());
    		CastorXmlMapper.convertFromObjectToXML(allPorts, "ports.xml");
    		
		} catch (IOException e) {
			e.printStackTrace();
		}
      return "index";
	}
	
	//@RequestMapping(value = "device/create", method=RequestMethod.POST, consumes = {MediaType.APPLICATION_XML_VALUE}, produces = {MediaType.APPLICATION_XML_VALUE})
	@RequestMapping(value = "device/create", method=RequestMethod.POST, consumes = {MediaType.APPLICATION_XML_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
	public @ResponseBody DeviceDto createDeviceFromXml(@RequestBody Source xml) throws Exception {
		Device d = null;
		DeviceDto dto = null;
		try {
			logger.info("XML is : "+xml);
			d = (Device) CastorXmlMapper.convertFromXMLToObject(xml);
			logger.info("Device Name : Converted from XML to Object Successfully : "+d.getDeviceName());
			deviceService.saveEntity(d);
			dto = new DeviceDto();
			dto.setDeviceName(d.getDeviceName());
			dto.setId(d.getId());
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		return dto;
	}
	
}
