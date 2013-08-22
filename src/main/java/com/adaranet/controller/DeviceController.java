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
import org.springframework.web.servlet.ModelAndView;

import com.adaranet.model.Devices;
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

		List<Devices> devices = new ArrayList<Devices>();
		
		Devices device1 = new Devices();
		device1.setDeviceName("Orion");
		devices.add(device1);
		
		Devices device2 = new Devices();
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
    public String addDevice(@ModelAttribute("device") Devices device) {

    	logger.info("Adding few dummy devices in the neo4j-graph-db");
    	
    	//deviceService.save(device);

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
