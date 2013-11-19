package com.adaranet.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import org.springframework.web.servlet.ModelAndView;

import com.adaranet.dto.DeviceDto;
import com.adaranet.jsonBeans.DevicesJsonBean;
import com.adaranet.model.Device;
import com.adaranet.model.Ports;
import com.adaranet.relationships.ConnectedToDevice;
import com.adaranet.service.DeviceService;
import com.adaranet.service.PortService;

@Controller
public class HomeController {
	
	private Logger logger = Logger.getLogger(getClass());
	
	@Autowired
	private DeviceService deviceService;	
	@Autowired
	private PortService portService;
	@Autowired
	private Neo4jTemplate template;
	

	 @RequestMapping(value = "", method = RequestMethod.GET)
	    //@Transactional
	    public String routeToIndexPage() throws Exception {
	    	logger.info("Routing user to Index page!");
	        return "index";
	    }
	 
	 
	 @RequestMapping(value = "/view", method = RequestMethod.GET)
	    //@Transactional
	    public String viewGraphInViewport() throws Exception {
	    	logger.info("Routing user to VIEW page : With EXTJS - 4.2.1-GPL!");
	        return "view";
	    }
	 
	 
	 @RequestMapping(value = "/getTreeNodes", method = RequestMethod.GET)
	    public String getTreeNodes() throws Exception {
	    	logger.info("Inside getTreeNodes() : Fetching file treeData.json!");
	        return "redirect:/getTreeNodes/treeData.json";
	    }
	 
	 
	 @RequestMapping("/visualize")
		@Transactional
		public ModelAndView visualize() throws Exception {
			logger.info("Comes inside visualize");
			Map<String, Object> model = new HashMap<String, Object>();
			
			ObjectMapper mapper = new ObjectMapper();
	    	String json = "";
	    	try {
	    		json = mapper.writeValueAsString(getWholeGraph());
	     
	    		logger.info("Printing the JSON");
	    		logger.info(json);
	    		
	    		model.put("jsonData", json);
	     
	    	} catch (Exception e) {
	    		e.printStackTrace();
	    	}
	    	
	    	return new ModelAndView("visualize", model);
		}
	 
	 
	 @RequestMapping(value = "/getJson", method = RequestMethod.GET, produces = "application/json")
		@Transactional
		public @ResponseBody Model getJson(Model model) throws Exception {
			logger.info("Comes inside getJson()!");
			
			ObjectMapper mapper = new ObjectMapper();
	    	String json = "";
	    	try {
	    		json = mapper.writeValueAsString(getWholeGraph());
	     
	    		logger.info("Printing the JSON");
	    		logger.info(json);
	    		
	    		model.addAttribute("jsonData", json);
	     
	    	} catch (Exception e) {
	    		e.printStackTrace();
	    	}
	    	
	    	return model;
		}
	 
	 
	 @RequestMapping(value = "/json", method = RequestMethod.GET, produces = "application/json")
	    public @ResponseBody List<DevicesJsonBean> getGraphAsJSON(Model model) throws Exception {
	    	return getWholeGraph();
	    }
	 
	 /*@RequestMapping(value = "/xml", method = RequestMethod.GET, produces = "application/xml")
	    public @ResponseBody DevicePortJsonBeanMapper getGraphAsXML(Model model) throws Exception { 
	    	return getWholeGraph();
	    }*/

	    private List<DevicesJsonBean> getWholeGraph() throws Exception {
	    	long startTime = System.currentTimeMillis();

	    	Iterable<Device> allDevices = deviceService.findAll();
	    	logger.info("Graph-Device Size : "+deviceService.count());
	    	List<DevicesJsonBean> devicesJsonBeanList = new ArrayList<DevicesJsonBean>();
	    	
	    	for (Device device : allDevices) {
	    		DevicesJsonBean devicesJsonBean = new DevicesJsonBean();
	    		
	    		for (Ports t : device.getHasPorts()) {
	    			logger.info("TEST SIZEEEEEEEEEEEE : "+device.getHasPorts().size());
					logger.info("Ports : "+t.getPortName());
				}
	    		
	    		DeviceDto deviceDto = new DeviceDto();
	    		deviceDto.setDeviceName(device.getDeviceName());
	    		deviceDto.setDeviceType(device.getDeviceType());
	    		deviceDto.setId(device.getId());
	    		
	    		/*List<DeviceDto> connectedDevices = new ArrayList<DeviceDto>();
	    		for(Device destDevice : device.getDeviceConnections()) {
	    			DeviceDto dto = new DeviceDto();
	    			dto.setId(destDevice.getId());
	    			dto.setDeviceName(destDevice.getDeviceName());
	    			logger.info("CONNECTED DEVICE NAME : "+destDevice.getDeviceName()+" : For Device : "+device.getDeviceName());
	    			dto.setDeviceType(destDevice.getDeviceType());
	    			connectedDevices.add(dto);
	    		}*/
	    		
	    		List<DeviceDto> connectedDevices = new ArrayList<DeviceDto>();
	    		for(ConnectedToDevice connectedToDevice : device.getConnectsToDevice()) {
	    			Device destDevice = connectedToDevice.getDestinationDevice();
	    			DeviceDto dto = new DeviceDto();
	    			dto.setId(destDevice.getId());
	    			dto.setDeviceName(destDevice.getDeviceName());
	    			logger.info("CONNECTED DEVICE NAME : "+destDevice.getDeviceName()+" : For Device : "+device.getDeviceName());
	    			dto.setDeviceType(destDevice.getDeviceType());
	    			dto.setPortId(connectedToDevice.getId());
	    			dto.setAvailableBandwidth(connectedToDevice.getAvailableBandwidth());
	    			dto.setConnectedPorts(connectedToDevice.getConnectedPorts());
	    			dto.setLatency(connectedToDevice.getLatency());
	    			dto.setLinkCapacity(connectedToDevice.getLinkCapacity());
	    			dto.setOriginalPortNames(connectedToDevice.getOriginalPortNames());
	    			connectedDevices.add(dto);
	    		}
	    		//Set<PortDto> hasPorts = new HashSet<PortDto>();
	    		/*for (Port port : device.getOutgoingConnectingPortsFromDevice()) {
	    			PortDto portDto = new PortDto();
	        		portDto.setId(port.getId());
	        		portDto.setPortName(port.getPortName());
	        		portDto.setPortType(port.getPortType());
	        		hasPorts.add(portDto);
				}*/

	    		devicesJsonBean.setParentDevice(deviceDto);
	    		devicesJsonBean.setConnectedDevices(connectedDevices);
	    		//devicesJsonBean.setHasPorts(hasPorts);
	    		
	    		devicesJsonBeanList.add(devicesJsonBean);
			}
	    	
	    	/*for (Port port : allPorts) {
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
			}*/
	    	
	    	//devicePortJsonBeanMapper.setDevicesJsonBean(devicesJsonBeanList);
	    	//devicePortJsonBeanMapper.setPortsJsonBean(portsJsonBeanList);
	    	
	    	long endTime   = System.currentTimeMillis();
	    	long totalTime = endTime - startTime;
	    	logger.info("TIME TOOK FOR THE METHOD TO COMPLETE : "+totalTime+" : milli seconds");
	    	
	    	//return devicePortJsonBeanMapper;
	    	return devicesJsonBeanList;
	    }
	 
}
