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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.adaranet.jsonBeans.DevicesJsonBean;
import com.adaranet.model.Device;
import com.adaranet.model.Port;
import com.adaranet.service.DeviceService;
import com.adaranet.service.PortService;
//import org.springframework.data.neo4j.transaction.Neo4jTransactional;

@Controller
public class DeviceController {

	protected Logger logger = Logger.getLogger(getClass());

	//@Autowired
    //private deviceService deviceRepository;
	
	@Autowired
	private DeviceService deviceService;
	
	@Autowired
	private PortService portService;

	@Autowired
	private Neo4jTemplate template;

	@RequestMapping(value = "/listAllDevices", method = RequestMethod.GET)
	@Transactional
	public ModelAndView listAllDevices() throws Exception {
		logger.info("Comes in inside listAllDevices()");	
		Map<String, Object> model = new HashMap<String, Object>();		
		List<Device> devices = new ArrayList<Device>();		
		Iterable<Device> allDevicesFromDb = deviceService.findAll();    	
    	if(allDevicesFromDb.iterator().hasNext()) {
    		for (Device device : allDevicesFromDb) {
    			logger.info("Device Name found from the DB : Using deviceService.findAll() : "+device.getDeviceName());
    			devices.add(device);
    		}
    		//logger.info("Deleting all the Nodes from Neo4j");
    		//deviceService.deleteAll(); //TODO: Need to Delete this....    		
    		Iterable<Device> result = deviceService.findAll();
    		if(result.iterator().hasNext()) {
    			logger.info("RESULT FOUND");
    		} else {
    			logger.info("NO RESULT FOUND");
    		}   		
    		/*Device orion = deviceService.findByPropertyValue("deviceName", "Orion");    		
    		Device polaris = deviceService.findByPropertyValue("deviceName", "Polaris");    		
    		if((orion != null)) {
    			logger.info("Orion & Polaris are not Null!");
    		}
    		else {
    			logger.info("Orion & Polaris are NULL!");
    		}*/    		 		
    		//TODO: Look into this JIRA Issue : http://stackoverflow.com/questions/10861588/spring-data-neo4j-relationshiptype-issues
    		//template.createRelationshipBetween(orion, polaris, RelationshipTypes.CONNECTS_TO, null);		
    		model.put("devices", devices);
    	} else {
    		logger.info("No devices found/persisted in Neo4j!");
    	}		
		//deviceService.addDevice(device);
		//return new ModelAndView("redirect:/device.html");
		return new ModelAndView("devicesList", model);
	}
	
	
	@RequestMapping(value = "/add", method = RequestMethod.GET)
    //@Transactional
    public String forwardToAddDevicePage() {
    	logger.info("Routing user to addDevice.jsp page!");  	
        return "addDevice";
    }
	
	
	@RequestMapping(value = "", method = RequestMethod.GET)
    //@Transactional
    public String routeToIndexPage() {
    	logger.info("Routing user to Index page!");
        return "index";
    }
	
	@RequestMapping(value = "/deleteAllDevices", method = RequestMethod.GET)
	@Transactional
	public String deleteAllDevices() throws Exception {
		logger.info("Comes in inside listAllDevices()");
		Iterable<Device> allDevicesFromDb = deviceService.findAll();
    	if(allDevicesFromDb.iterator().hasNext()) {
    		logger.info("Deleting all the Nodes from Neo4j");
    		deviceService.deleteAll(); //TODO: Need to Delete this....		
    		logger.info("Deleted all the devices from Neo4j.");   		
    	} else {
    		logger.info("No devices Found/Persisted in Neo4j that are to be deleted!");
    	} 	
		return "redirect:/listAllDevices";
	}
	
	
	@RequestMapping(value = "/addDevice", method = RequestMethod.POST)
	@Transactional
    public String addDevice(@RequestParam("deviceName") String deviceName) throws Exception {
		//public String addDevice(@ModelAttribute("device") Device device) {}		
		if(deviceName != null && !deviceName.isEmpty() && !deviceName.equals("")) {		
	    	logger.info("Adding few dummy devices in the neo4j-graph-db");  	
	    	//Device newDevice = template.save(new Device(deviceName));
	    	Device newDevice = new Device(deviceName);    		
	    	deviceService.saveEntity(newDevice);	    	
	    	Iterable<Device> devices = deviceService.findAll();    	
	    	if(devices.iterator().hasNext()) {
	    		for (Device device : devices) {
	    			logger.info("Device Name found from the DB : Using deviceService.findAll() : "+device.getDeviceName());
	    		}
	    	} else {
	    		logger.info("No devices persisted in Neo4j!");
	    	}    	
	    	logger.info("After returning all the devices which are persisted in Neo4j");	    	
		} else {
			logger.info("Device Name passed in from the template is 'NULL' or 'BLANK'. Therefore, not persisting the null Node in Neo4j.");
		}
        return "redirect:/listAllDevices";
    }
	
	
	@RequestMapping("/connectDevices")
	@Transactional
	public String connectDevices(@RequestParam("startNode") String startNode, @RequestParam("endNode") String endNode) throws Exception {
		Device startDevice = deviceService.findDeviceByDeviceName(startNode); //searchDeviceByDeviceName(startNode);		
		Device endDevice = deviceService.findDeviceByDeviceName(endNode); //searchDeviceByDeviceName(endNode);		
    	if(startDevice != null && endDevice != null) {
    		logger.info("Saving new device : Saving relationship.");
    		
    		//startDevice.connectsToDevice(endDevice, Integer.toString(AppUtils.generateRandomInt(100)), Integer.toString(AppUtils.generateRandomInt(100)));

    		//startDevice.setConnectedDevices(connectedDevices);
    		
    		Port sourcePort = new Port("em0", "Ethernet");
    		Port destPort = new Port("em4", "Ethernet");
    		
    		portService.saveEntity(sourcePort);
    		portService.saveEntity(destPort);
    				
    		startDevice.connectPortsAndDestinationDevice(sourcePort, destPort, endDevice);
    		
    		deviceService.saveEntity(startDevice);
    		//deviceService.save(endDevice);
    	} else
    		logger.info("Cannot connect : "+startNode + " : with : "+endNode);   	
    	return "redirect:/listAllDevices";
	}

	
	@RequestMapping("/visualize")
	@Transactional
	public String visualize(Model model) throws Exception {  	
		//logger.info("YO");
		//model.addAttribute("jsonData", getWholeGraphAsJson());
		//Map<String, Object> model = new HashMap<String, Object>();
		//model.put("jsonData", getWholeGraphAsJson());
		//logger.info("Before List");
		//List<DevicesJsonBean> list = getWholeGraphAsJson();
		
		logger.info("Comes inside visualize");
		
		ObjectMapper mapper = new ObjectMapper();
    	String json = "";
    	try {
    		//map.put("devices", Collections.allDevices);
    		json = mapper.writeValueAsString(getWholeGraphAsJson());
     
    		logger.info("Printing the JSON");
    		logger.info(json);
    		
    		model.addAttribute("jsonData", json);
     
    	} catch (Exception e) {
    		e.printStackTrace();
    	}
    	
    	return "visualize";
	}
	
	/*private Device searchDeviceByDeviceName(String deviceName) {		
		Device foundDevice = deviceService.findByPropertyValue("deviceName", deviceName);		
		if(foundDevice == null) {
			foundDevice = new Device(deviceName);
			deviceService.save(foundDevice);
		}	
		return foundDevice;
	}*/
	
	
	/*@RequestMapping("/getAllChildConnectedDevices")
    public String getAllRelationshipByDeviceName(@RequestParam("deviceName") String deviceName, Model model) {	
		
		logger.info("*****************************************************************************************");
		logger.info("Inside getAllRelationshipByDeviceName()");	
		List<Map<String, Device>> devices = deviceService.getAllChildConnectedDevices(deviceName);
		logger.info("Device Connected to :"+deviceName+" : Number of Device Connected : "+devices.size());
		for (Map<String, Device> device : devices) {
			
			for(Map.Entry<String, Device> entry : device.entrySet()) {
				//Device val = entry.getValue();
				//logger.info("VALL : "+val.getDeviceName());
				logger.info(entry.getKey() + "/" + entry.getValue());
			}
			
			//logger.info("Devices having INCOMING Relationship : CONNECTED_TO_DEVICE : Device Name : "+device.getDeviceName());			
		}	
	
		logger.info("*****************************************************************************************");
		model.addAttribute("devices", devices);	
		return "devicesList";
	}*/
	
	@RequestMapping("/getAllChildConnectedDevices")
    public String getAllRelationshipByDeviceName(@RequestParam("deviceName") String deviceName, Model model) {	
		
		logger.info("Inside getAllRelationshipByDeviceName()");	
		List<Device> devices = new ArrayList<Device>();
		devices = deviceService.getAllChildConnectedDevices(deviceName);
		logger.info("COUNT : "+devices.size());
		model.addAttribute("devices", devices);	
		return "devicesList";
	}
	
	
	@RequestMapping("/findDeviceByName")
    public String findDevice(@RequestParam("deviceName") String deviceName, Model model) {
		
		Device foundDevice = deviceService.findDeviceByDeviceName(deviceName); //searchDeviceByDeviceName(deviceName);
    	List<Device> devices = new ArrayList<Device>();   	
    	if(foundDevice != null) {
    		
			//int count = foundDevice.getOutgoingDeviceConnections() != null ? foundDevice.getOutgoingDeviceConnections().size() : 0;
			//logger.info("Count of OutgoingConnectedDevices Collection : "+count);
    		
    		devices.add(foundDevice);
    		logger.info("FOUND DEVICE's NAME : "+foundDevice.getDeviceName() + " : Search String : "+deviceName);
    	} else {
    		logger.info("Device NOT FOUND with search string : "+deviceName);
    	}   	
    	model.addAttribute("devices", devices);  	
        //map.put("person", new Person());
        //map.put("peopleList", personService.findAll().iterator());
        return "devicesList";
    }

	
    @RequestMapping("/")
    public String index() {    	
    	logger.info("Redirecting to index.jsp");   	
        //map.put("person", new Person());
        //map.put("peopleList", personService.findAll().iterator());
        return "index";
    }
    
    @RequestMapping("/json")
    public @ResponseBody List<DevicesJsonBean> getGraphAsJson(Model model) throws Exception { 
    	return getWholeGraphAsJson();
    }

    private @ResponseBody List<DevicesJsonBean> getWholeGraphAsJson() throws Exception {
    	long startTime = System.currentTimeMillis();

    	Iterable<Device> allDevices = deviceService.findAll();
    	logger.info("Graph Size : "+deviceService.count());
    	
    	//List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    	List<DevicesJsonBean> jsonBeanList = new ArrayList<DevicesJsonBean>();
    	
    	logger.info("");
    	/*for (Device device : allDevices) {
			Set<ConnectedDevices> outgoingDevices = device.getOutgoingDeviceConnections();
			Set<ConnectedDevices> incomingDevices = device.getIncomingDeviceConnections();
			logger.info("INCOMING DEVICES SIZE : "+incomingDevices.size());
			
			Set<DeviceDto> deviceOutgoingDtos = new HashSet<DeviceDto>();
			Set<DeviceDto> deviceIncomingDtos = new HashSet<DeviceDto>();
			
			DeviceDto parentDevice = new DeviceDto();
			parentDevice.setDeviceName(device.getDeviceName());
			parentDevice.setDeviceType(device.getDeviceType());
			parentDevice.setId(device.getId());

			//Map<String, Object> deviceMapper = new HashMap<String, Object>();
			//deviceMapper.put("parentDevice", device);
			//deviceMapper.put("outgoingDevices", outgoingDevices);
			//list.add(deviceMapper);
			
			logger.info("Device persisted in Neo4j is : "+device.getDeviceName()+" : Size of the SET : "+outgoingDevices.size());
			for (ConnectedDevices connectedDevices : outgoingDevices) {
				DeviceDto deviceDto = new DeviceDto();
				deviceDto.setId(connectedDevices.getEndDevice().getId());
				deviceDto.setDeviceName(connectedDevices.getEndDevice().getDeviceName());
				deviceDto.setDeviceType(connectedDevices.getEndDevice().getDeviceType());
				deviceDto.setCost(connectedDevices.getCost());
				deviceDto.setValue(connectedDevices.getValue());
				deviceOutgoingDtos.add(deviceDto);
				logger.info("Connected Devices for : "+device.getDeviceName()+" : is : "+connectedDevices.getEndDevice().getDeviceName()+" : Value : "+connectedDevices.getValue());
			}
			
			for (ConnectedDevices connectedDevices : incomingDevices) {
				logger.info("Start Node : "+connectedDevices.getStartDevice().getDeviceName()+" : End Node : "+connectedDevices.getEndDevice().getDeviceName());
				DeviceDto deviceDto = new DeviceDto();
				deviceDto.setId(connectedDevices.getStartDevice().getId());
				deviceDto.setDeviceName(connectedDevices.getStartDevice().getDeviceName());
				deviceDto.setDeviceType(connectedDevices.getStartDevice().getDeviceType());
				deviceDto.setCost(connectedDevices.getCost());
				deviceDto.setValue(connectedDevices.getValue());
				deviceIncomingDtos.add(deviceDto);
			}
			
			DevicesJsonBean bean = new DevicesJsonBean();
			bean.setParentDevice(parentDevice);
			bean.setOutgoingDevices(deviceOutgoingDtos);
			bean.setIncomingDevices(deviceIncomingDtos);
			jsonBeanList.add(bean);
			
			logger.info("");
		}*/
    	
    	/*ObjectMapper mapper = new ObjectMapper();
    	
    	try {
    		//map.put("devices", Collections.allDevices);
    		String json = mapper.writeValueAsString(jsonBeanList);
     
    		logger.info("Printing the JSON");
    		logger.info(json);
    		
    		//model.addAttribute("json", json);
     
    	} catch (Exception e) {
    		e.printStackTrace();
    	}*/
    	
    	long endTime   = System.currentTimeMillis();
    	long totalTime = endTime - startTime;
    	logger.info("TIME TOOK FOR THE METHOD TO COMPLETE : "+totalTime+" : milli seconds");
    	
    	return jsonBeanList;
    }
    
    @RequestMapping("/deleteDevice")
    @Transactional
    public String deletePerson(@RequestParam("deviceName") String deviceName) {
    	Device foundDevice = deviceService.findDeviceByDeviceName(deviceName);
    	deviceService.deleteEntity(foundDevice);
        return "redirect:/listAllDevices";
    }
    
}
