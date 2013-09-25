package com.adaranet.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

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
import com.adaranet.dto.PortDto;
import com.adaranet.jsonBeans.DevicePortJsonBeanMapper;
import com.adaranet.jsonBeans.DevicesJsonBean;
import com.adaranet.jsonBeans.PortsJsonBean;
import com.adaranet.model.Device;
import com.adaranet.model.Port;
import com.adaranet.relationships.HasPort;
import com.adaranet.service.DeviceService;
import com.adaranet.service.PortService;

@Controller
public class DeviceController {

	protected Logger logger = Logger.getLogger(getClass());

	@Autowired
	private DeviceService deviceService;
	@Autowired
	private PortService portService;
	@Autowired
	private Neo4jTemplate template;

	
	//********************* Start of Controller Methods ***************************//
	
	@RequestMapping(value = "/listAllDevicesAndPorts", method = RequestMethod.GET)
	@Transactional
	public ModelAndView listAllDevicesAndPorts() throws Exception {
		logger.info("Comes in inside listAllDevices()");	
		Map<String, Object> model = new HashMap<String, Object>();
		
		List<Device> devices = (List<Device>) IteratorUtil.asCollection(deviceService.findAll());
		model.put("devices", devices);
		
    	List<Port> ports = (List<Port>) IteratorUtil.asCollection(portService.findAll());
    	model.put("ports", ports);
		return new ModelAndView("devicesList", model);
	}
	
	
	@RequestMapping(value = "/add", method = RequestMethod.GET)
    //@Transactional
    public String forwardToAddDevicePage() {
    	logger.info("Routing user to addDevice.jsp page!");  	
        return "addDevice";
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
		return "redirect:/listAllDevicesAndPorts";
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
        return "redirect:/listAllDevicesAndPorts";
    }

	
	@RequestMapping(value = "/connectDevicesViaPorts", method = RequestMethod.POST)
	@Transactional
	public String connectDevices(@RequestParam("startNode") String startNode, @RequestParam("endNode") String endNode,
								 @RequestParam("startPort") String startPort, @RequestParam("endPort") String endPort,
								 @RequestParam("linkCapacity") String linkCapacity, @RequestParam("availableBandwidth") String availableBandwidth,
								 @RequestParam("latency") String latency) throws Exception {
		Device startDevice = deviceService.findDeviceByDeviceName(startNode); //searchDeviceByDeviceName(startNode);		
		Device endDevice = deviceService.findDeviceByDeviceName(endNode); //searchDeviceByDeviceName(endNode);		
    	if(startDevice != null && endDevice != null) {
    		logger.info("");
    		logger.info("*******************************************************************************************************************");
    		logger.info("Found both the devices. Now relating them via Ports.");
    		
    		//startDevice.connectsToDevice(endDevice, Integer.toString(AppUtils.generateRandomInt(100)), Integer.toString(AppUtils.generateRandomInt(100)));

    		//startDevice.setConnectedDevices(connectedDevices);
    		//listAllDevicesAndPortservice.saveEntity(startDevice);
    		Port sourcePort = null;
    		Port destPort = null;
    		
    		Set<Port> startDeviceHasPort = startDevice.getOutgoingConnectingPortsFromDevice();
    		logger.info("Start Device Has Port Set Size : "+startDeviceHasPort.size());
    		for (Port port : startDeviceHasPort) {
				logger.info("Outgoing Connecting Port for Start Device : "+port.getPortName().toLowerCase() +" : Start Port Name : "+startPort);
				if((port.getPortName().toLowerCase()).equals(startPort.toLowerCase())) {
					sourcePort = port;
					break;
				}
			}
    		
    		Set<Port> endDeviceHasPort = endDevice.getOutgoingConnectingPortsFromDevice();
    		logger.info("End Device Has Port Set Size : "+endDeviceHasPort.size());
    		for (Port port : endDeviceHasPort) {
    			logger.info("Outgoing Connecting Port for End Device : "+port.getPortName().toLowerCase() +" : End Port Name : "+endPort);
				if((port.getPortName().toLowerCase()).equals(endPort.toLowerCase())) {
					destPort = port;
					break;
				}
			}

    		//Object reference comparison(Not object itself).
    		if(sourcePort != null && destPort != null) { 
    			logger.info("Found both the ports for both the devices. Therefore, connecting Two Ports.");
    			//sourcePort.connectsToPort(destPort);
    			sourcePort.connectsToPort(destPort, linkCapacity, availableBandwidth, latency);
    			template.save(sourcePort);
    			logger.info("Saved the 'ConnectsToPort' relationship in neo4j.");
    		} else {
    			logger.info("Source Port Or Dest. Port is null. Therefore, we can not save/connect the two ports.");
    		}
    		
    	} else
    		logger.info("Cannot connect : "+startNode + " : with : "+endNode);   
    	
    	logger.info("*******************************************************************************************************************");
    	logger.info("");
    	return "redirect:/listAllDevicesAndPorts";
	}
	
	/*@RequestMapping("/connectDeviceToPorts")
	@Transactional
	public String connectDeviceToPorts(@RequestParam("startNode") String startNode, @RequestParam("portName") String portName) throws Exception {
		Device startDevice = deviceService.findDeviceByDeviceName(startNode); //searchDeviceByDeviceName(startNode);		
		Port port = portService.findPortByPortName(portName);
		HasPort h = new HasPort();
		h.setStartDevice(startDevice);
		h.setConnectedPort(port);
		template.save(h);
    	return "redirect:/listAllDevicesAndPorts";
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
        return "devicesList";
    }

    
    @RequestMapping("/deleteDevice")
    @Transactional
    public String deleteDevice(@RequestParam("deviceName") String deviceName) {
    	Device foundDevice = deviceService.findDeviceByDeviceName(deviceName);
    	deviceService.deleteEntity(foundDevice);
        return "redirect:/listAllDevicesAndPorts";
    }
    
}
