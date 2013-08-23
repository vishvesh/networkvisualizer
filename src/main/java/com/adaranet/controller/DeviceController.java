package com.adaranet.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.support.Neo4jTemplate;
import org.springframework.data.neo4j.transaction.Neo4jTransactional;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.adaranet.RelationshipTypes;
import com.adaranet.model.Device;
import com.adaranet.service.DeviceService;

@Controller
public class DeviceController {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
    private DeviceService deviceService;

	@Autowired
	private Neo4jTemplate template;

	@RequestMapping(value = "/listAllDevices", method = RequestMethod.GET)
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
    		//deviceService.deleteAll(); //TODO: Need to Delete this....
    		
    		Device orion = deviceService.findByPropertyValue("deviceName", "Orion");
    		Device polaris = deviceService.findByPropertyValue("deviceName", "Polaris");
    		
    		//TODO: Look into this JIRA Issue : http://stackoverflow.com/questions/10861588/spring-data-neo4j-relationshiptype-issues
    		//template.createRelationshipBetween(orion, polaris, RelationshipTypes.CONNECTS_TO, null);
    		
    		logger.info("deviceService.findByPropertyValue : "+orion.getDeviceName());
    		model.put("devices", devices);
    	} else {
    		logger.info("No devices persisted in Neo4j!");
    	}
		
		//deviceService.addDevice(device);
		//return new ModelAndView("redirect:/device.html");
		return new ModelAndView("devicesList", model);
	}
	
	@RequestMapping(value = "/add", method = RequestMethod.GET)
    @Transactional
    public String addRequest() {

    	logger.info("Routing user to addDevice.jsp page!");
    	
    	//deviceService.save(device);

        return "addDevice";
    }
	
	@RequestMapping(value = "/addDevice", method = RequestMethod.POST)
    @Neo4jTransactional
    public String addDevice(@RequestParam("deviceName") String deviceName) throws Exception {
		//public String addDevice(@ModelAttribute("device") Device device) {}
		
		if(deviceName != null && !deviceName.isEmpty() && !deviceName.equals("")) {
		
	    	logger.info("Adding few dummy devices in the neo4j-graph-db");
	    	
	    	//Device newDevice = template.save(new Device(deviceName));
	    	Device newDevice = new Device(deviceName);
	    		
	    	deviceService.save(newDevice);
	    	
	    	Device theDevice = deviceService.findOne(newDevice.getId());
	    	logger.info("Retrieved Device name from Neo4j : using deviceService.findOne() : "+theDevice.getDeviceName());
	    	
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
