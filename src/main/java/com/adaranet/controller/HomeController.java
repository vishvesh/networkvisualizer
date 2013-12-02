package com.adaranet.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import org.apache.log4j.Logger;
import org.codehaus.jackson.map.ObjectMapper;
import org.neo4j.helpers.collection.IteratorUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.support.Neo4jTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.adaranet.dto.DeviceDto;
import com.adaranet.jsonBeans.DevicesJsonBean;
import com.adaranet.model.Device;
import com.adaranet.model.Ports;
import com.adaranet.relationships.ConnectedToDevice;
import com.adaranet.service.ConnectedToDeviceRelationshipService;
import com.adaranet.service.DeviceService;
import com.adaranet.service.PortService;
import com.adaranet.util.AppConstants;
import com.adaranet.util.AppUtils;

@Controller
public class HomeController {
	
	private Logger logger = Logger.getLogger(getClass());
	
	@Autowired
	private DeviceService deviceService;	
	@Autowired
	private PortService portService;
	@Autowired
	private Neo4jTemplate template;
	@Autowired
	private ConnectedToDeviceRelationshipService connectedToDeviceRelationshipService;
	

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
	 
	 
	 @RequestMapping(value = "/updateRandomEdges", method = RequestMethod.GET)
	 @Transactional
	 	public @ResponseBody String updateRandomDeviceRelationshipEdges() throws Exception {
	 		try {
	 			logger.info("Inside Method : updateRandomDeviceRelationshipEdges()!");
 				List<ConnectedToDevice> connections = (ArrayList<ConnectedToDevice>) IteratorUtil.asCollection(connectedToDeviceRelationshipService.findAll());
 				//Collections.shuffle(connections);
 				logger.info("Device Connections Size : "+connections.size());
	 			for(int i = 0; i < 50; i++) {
	 				ConnectedToDevice connection = connections.get((AppUtils.generateRandomInt(connections.size() - 1)));
	 				connection.setAvailableBandwidth(Integer.toString(AppUtils.generateRandomInt(100)));
	 				connection.setLatency(Integer.toString(AppUtils.generateRandomInt(100)));
	 				connection.setLinkCapacity(Integer.toString(AppUtils.generateRandomInt(100)));
	 				connectedToDeviceRelationshipService.saveEntity(connection);
	 			}
	 			logger.info("Randomly Updated the Network!");
	 			
			} catch (Exception e) {
				e.printStackTrace();
			}
	 		return "success";
	 	}

	 
		@Transactional
		public void beforeLoad() {
		try {
				System.out.println("***** Cleaning Neo4jDatabase! *****");
				if(deviceService.count() > 0) {
		    		System.out.println("Devices present in the Graph : Cleaning them! : Count : "+deviceService.count());
					deviceService.deleteAll();
				} else {
					System.out.println("No Devices Present in the Graph!");
				}
		    	if(portService.count() > 0) {
		    		System.out.println("Ports present in the Graph : Cleaning them! : Count : "+portService.count());
		    		portService.deleteAll();
		    	} else {
		    		System.out.println("No Ports Present in the Graph!");
		    	}
				System.out.println("***** Neo4jDatabase Cleaned Successfully! *****");
				//Log4jConfigurer.initLogging( "classpath:propFiles/log4j.properties" );
		    }
		    catch( Exception ex ) {
		      ex.printStackTrace();
		    }
		}

		
		@Transactional
		public void createDevices(String numberOfDevices, String numberOfPorts) throws Exception {
			System.out.println("***** TESTING METHOD createDevices() *****");

			for(int i = 0; i < Integer.parseInt(numberOfDevices); i++) {
				//String uniqueId = getUniqueID();
				String uniqueId = "Device"+i;
				System.out.println(i+ 
									" : Unique ID : "+uniqueId+
									" : UUID : "+UUID.randomUUID().toString()+
									" : Replaced UUID : "+UUID.randomUUID().toString().replaceAll("-", ""));
				
				//Device device = deviceService.saveEntity(new Device(uniqueId));
				Device device = new Device(uniqueId, AppConstants.DEVICE_TYPE__DEVICE);
				template.save(device);
				//deviceService.saveEntity(device);
				//Thread.sleep(1 * 200);
				for(int j = 0; j < Integer.parseInt(numberOfPorts); j++) {
					Ports newPort = new Ports();
					System.out.println("Port Name Created : "+(uniqueId+"-em"+j));
		    		newPort.setPortName(uniqueId+"-em"+j);
		    		device.getHasPorts().add(newPort);
		    		template.save(device);
				}
			}
		}
		
		
		@Transactional
		public void connectPorts() throws Exception {
			System.out.println("***** TESTING METHOD connectPorts() *****");
			//MockHttpServletRequest request = new MockHttpServletRequest("POST", "/networkvisualizer/connectDevicesViaPorts");
			//MockHttpServletResponse response = new MockHttpServletResponse();
			List<Device> devices = (List<Device>) IteratorUtil.asCollection(deviceService.findAll());
			System.out.println("Devices Found : Count/Size : "+devices.size());
			for(int i = 0; i < devices.size(); i++) {
				Device startDevice = devices.get(AppUtils.generateRandomInt(devices.size() - 1));
				Device endDevice = devices.get(AppUtils.generateRandomInt(devices.size() - 1));
				String startDeviceName = startDevice.getDeviceName();
				String endDeviceName = endDevice.getDeviceName();
				if(startDeviceName == endDeviceName) {
					System.out.println("Start Device == End Device. : Start Device : "+startDeviceName+" : End Device : "+endDeviceName);
				} else {
					System.out.println("Start Device != End Device. : Start Device : "+startDeviceName+" : End Device : "+endDeviceName);
					Set<Ports> startDevicePortsList = (Set<Ports>) startDevice.getHasPorts();
					Set<Ports> endDevicePortsList = (Set<Ports>) endDevice.getHasPorts();
					Object[] startDevicePorts =  startDevicePortsList.toArray();
					Object[] endDevicePorts = endDevicePortsList.toArray();
					System.out.println("Length : "+startDevicePortsList.size()+" : "+startDevicePorts.length+" : "+endDevicePorts.length);
					//for(int j = 0; j < startDevicePorts.length; j ++) {
						Ports startPort = (Ports) startDevicePorts[AppUtils.generateRandomInt(startDevicePorts.length - 1)];
						Ports endPort = (Ports) endDevicePorts[AppUtils.generateRandomInt(endDevicePorts.length - 1)];
						String startPortName = startPort.getPortName();
						String endPortName = endPort.getPortName();
						String originalPortNames = AppUtils.replacePorts(startPortName)+'-'+AppUtils.replacePorts(endPortName);
						ConnectedToDevice connectedToDevice = startDevice.connectsToDevice(endDevice,
																						startPort,
																						endPort,
																    					originalPortNames,
																    					Integer.toString(AppUtils.generateRandomInt(100)),
																    					Integer.toString(AppUtils.generateRandomInt(100)),
																    					Integer.toString(AppUtils.generateRandomInt(100)));
						template.save(connectedToDevice);
						System.out.println("Connected Relationship Successfully!");
						System.out.println("Start Device : "+startDeviceName+
											" : Start Port : "+startPortName+
											" : End Device : "+endDeviceName+
											" : End Port : "+endPortName);
					//}
				}
			}
			System.out.println("Connection Completed Sucessfully!");
			System.out.println("***** TESTING METHOD connectPorts() *****");
		}
		
		
		@Transactional
		public void showDevices() throws Exception {
			System.out.println("***** TESTING METHOD showDevices() *****");
			Iterable<Device> devices = deviceService.findAll();
			System.out.println("Devices Found : Count : "+deviceService.count());
			for (Device device : devices) {
				System.out.println("ALL DEVICES IN THE LOOP : "+device.getDeviceName());
			}
			System.out.println("***** TESTING METHOD showDevices() *****");
		}
	 
		@Transactional
		@RequestMapping(value = "/simulateNetwork", method = RequestMethod.POST)
	    public @ResponseBody String simulateNetwork(@RequestParam("noOfDevices") String noOfDevices, @RequestParam("noOfPorts") String noOfPorts) throws Exception {
			logger.info("Inside simulateNetwork() : noOfDevices : "+noOfDevices+" : noOfPorts : "+noOfPorts);
			this.beforeLoad();
			this.createDevices(noOfDevices, noOfPorts);
			this.connectPorts();
			this.showDevices();
			System.out.println("Relationship Count from DB : "+template.count(ConnectedToDevice.class)
					+ " : Count for Ports : "+template.count(Ports.class)
					+ " : Count for Devices : "+template.count(Device.class));
	    	return "success";
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
	    		
	    		/*for (Ports t : device.getHasPorts()) {
	    			logger.info("TEST SIZEEEEEEEEEEEE : "+device.getHasPorts().size());
					logger.info("Ports : "+t.getPortName());
				}*/
	    		
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
