package com.adaranet.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.log4j.Logger;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.support.Neo4jTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.adaranet.model.Device;
import com.adaranet.service.DeviceService;
//import org.springframework.data.neo4j.transaction.Neo4jTransactional;

@Controller
public class DeviceController {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
    private DeviceService deviceService;

	@Autowired
	private Neo4jTemplate template;

	@RequestMapping(value = "/listAllDevices", method = RequestMethod.GET)
	@Transactional
	public ModelAndView listAllDevices() throws Exception {
		logger.info("Comes in inside listAllDevices()");
		/*List<Device> devices = new ArrayList<Device>();	
		Device device1 = new Device();
		device1.setDeviceName("Orion");
		devices.add(device1);		
		Device device2 = new Device();
		device2.setDeviceName("Polaris");
		devices.add(device2);		
		Map<String, Object> model = new HashMap<String, Object>();
		model.put("devices", devices);*/		
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
	    	deviceService.save(newDevice);	    	
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
    		startDevice.connectsToDevice(endDevice);
    		deviceService.save(startDevice);
    	} else
    		logger.info("Cannot connect : "+startNode + " : with : "+endNode);   	
    	return "redirect:/listAllDevices";
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
    public String index(Map<String, Object> map) {    	
    	logger.info("Redirecting to index.jsp");   	
        //map.put("person", new Person());
        //map.put("peopleList", personService.findAll().iterator());
        return "index";
    }

    
    @RequestMapping("/delete/{personId}")
    @Transactional
    public String deletePerson(@PathVariable("personId") Long personId) {
    	deviceService.delete(personId);
        return "redirect:/people/";
    }
    
}
