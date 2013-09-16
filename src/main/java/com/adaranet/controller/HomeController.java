package com.adaranet.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.log4j.Logger;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.support.Neo4jTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.adaranet.dto.DeviceDto;
import com.adaranet.dto.PortDto;
import com.adaranet.jsonBeans.DevicePortJsonBeanMapper;
import com.adaranet.jsonBeans.DevicesJsonBean;
import com.adaranet.jsonBeans.PortsJsonBean;
import com.adaranet.model.Device;
import com.adaranet.model.Port;
import com.adaranet.service.DeviceService;
import com.adaranet.service.PortService;

@Controller
public class HomeController {
	
	protected Logger logger = Logger.getLogger(getClass());
	
	@Autowired
	private DeviceService deviceService;
	
	@Autowired
	private PortService portService;

	@Autowired
	private Neo4jTemplate template;
	

	 @RequestMapping(value = "", method = RequestMethod.GET)
	    //@Transactional
	    public String routeToIndexPage() {
	    	logger.info("Routing user to Index page!");
	        return "index";
	    }
	 
	 
	 @RequestMapping("/visualize")
		@Transactional
		public String visualize(Model model) throws Exception {
			logger.info("Comes inside visualize");
			
			ObjectMapper mapper = new ObjectMapper();
	    	String json = "";
	    	try {
	    		json = mapper.writeValueAsString(getWholeGraphAsJson());
	     
	    		logger.info("Printing the JSON");
	    		logger.info(json);
	    		
	    		model.addAttribute("jsonData", json);
	     
	    	} catch (Exception e) {
	    		e.printStackTrace();
	    	}
	    	
	    	return "visualize";
		}
	 
	 
	 @RequestMapping("/json")
	    public @ResponseBody DevicePortJsonBeanMapper getGraphAsJson(Model model) throws Exception { 
	    	return getWholeGraphAsJson();
	    }

	    private @ResponseBody DevicePortJsonBeanMapper getWholeGraphAsJson() throws Exception {
	    	long startTime = System.currentTimeMillis();

	    	Iterable<Device> allDevices = deviceService.findAll();
	    	logger.info("Graph-Device Size : "+deviceService.count());
	    	//List<Device> allDevices = (List<Device>) IteratorUtil.asCollection(deviceService.findAll());
	    	//logger.info("Graph-Device Size : "+allDevices.size());
	    	
	    	Iterable<Port> allPorts = portService.findAll();
	    	logger.info("Graph-Port Size : "+portService.count());
	    	//List<Port> allPorts = (List<Port>) IteratorUtil.asCollection(portService.findAll());
	    	//logger.info("Graph-Port Size : "+allPorts.size());
	    	
	    	DevicePortJsonBeanMapper devicePortJsonBeanMapper = new DevicePortJsonBeanMapper();
	    	List<DevicesJsonBean> devicesJsonBeanList = new ArrayList<DevicesJsonBean>();
	    	List<PortsJsonBean> portsJsonBeanList = new ArrayList<PortsJsonBean>();
	    	
	    	for (Device device : allDevices) {
	    		DevicesJsonBean devicesJsonBean = new DevicesJsonBean();
	    		
	    		DeviceDto deviceDto = new DeviceDto();
	    		deviceDto.setDeviceName(device.getDeviceName());
	    		deviceDto.setDeviceType(device.getDeviceType());
	    		deviceDto.setId(device.getId());
	    		
	    		Set<PortDto> hasPorts = new HashSet<PortDto>();
	    		for (Port port : device.getOutgoingConnectingPortsFromDevice()) {
	    			PortDto portDto = new PortDto();
	        		portDto.setId(port.getId());
	        		portDto.setPortName(port.getPortName());
	        		portDto.setPortType(port.getPortType());
	        		hasPorts.add(portDto);
				}

	    		devicesJsonBean.setParentDevice(deviceDto);
	    		devicesJsonBean.setHasPorts(hasPorts);
	    		
	    		devicesJsonBeanList.add(devicesJsonBean);
			}
	    	
	    	for (Port port : allPorts) {
				PortsJsonBean portsJsonBean = new PortsJsonBean();
				
				PortDto portDto = new PortDto();
				portDto.setId(port.getId());
				portDto.setPortName(port.getPortName());
				portDto.setPortType(port.getPortType());
				
				Set<PortDto> connectedPorts = new HashSet<PortDto>();
				for (Port connectedPort : port.getAllConnectedPortsFromSourcePort()) {
					PortDto connectedPortDto = new PortDto();
					connectedPortDto.setId(connectedPort.getId());
					connectedPortDto.setPortName(connectedPort.getPortName());
					connectedPortDto.setPortType(connectedPort.getPortType());
	        		connectedPorts.add(connectedPortDto);
				}
				
				portsJsonBean.setSourcePort(portDto);
				portsJsonBean.setConnectedPorts(connectedPorts);
				
				portsJsonBeanList.add(portsJsonBean);
			}
	    	
	    	devicePortJsonBeanMapper.setDevicesJsonBean(devicesJsonBeanList);
	    	devicePortJsonBeanMapper.setPortsJsonBean(portsJsonBeanList);
	    	
	    	long endTime   = System.currentTimeMillis();
	    	long totalTime = endTime - startTime;
	    	logger.info("TIME TOOK FOR THE METHOD TO COMPLETE : "+totalTime+" : milli seconds");
	    	
	    	return devicePortJsonBeanMapper;
	    }
	 
}
