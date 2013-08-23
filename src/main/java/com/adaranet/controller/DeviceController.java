package com.adaranet.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.support.Neo4jTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.adaranet.model.Device;
import com.adaranet.service.DeviceService;

@Controller
public class DeviceController {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
    private DeviceService deviceService;

	@Autowired
	private Neo4jTemplate template;

	@RequestMapping(value = "/firstblood", method = RequestMethod.GET)
	public ModelAndView listAllDevices() {

		logger.info("Comes in inside listAllDevices()");

		List<Device> devices = new ArrayList<Device>();
		
		Device device1 = new Device();
		device1.setDeviceName("Orion");
		devices.add(device1);
		
		Device device2 = new Device();
		device2.setDeviceName("Polaris");
		devices.add(device2);
		
		Map<String, Object> model = new HashMap<String, Object>();
		model.put("devices", devices);
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
    @Transactional
    public String addDevice(@RequestParam("deviceName") String deviceName) {
		//public String addDevice(@ModelAttribute("device") Device device) {}
		
    	logger.info("Adding few dummy devices in the neo4j-graph-db");
    	
    	//Device newDevice = template.save(new Device(deviceName));
    	Device newDevice = new Device(deviceName);
    		
    	deviceService.save(newDevice);
    	
    	Device theDevice = deviceService.findOne(newDevice.getId());
    	logger.info("Retrieved Device name from Neo4j : using deviceService.findOne() : "+theDevice.getDeviceName());
    	
    	Iterable<Device> devices = deviceService.findAll();
    	for (Device device : devices) {
			logger.info("Device Name found from the DB : Using deviceService.findAll() : "+device.getDeviceName());
		}

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
