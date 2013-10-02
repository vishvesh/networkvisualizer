package com.adaranet.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.support.Neo4jTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.adaranet.model.Device;
import com.adaranet.model.Port;
import com.adaranet.model.Ports;
import com.adaranet.service.DeviceService;
import com.adaranet.service.PortService;
import com.adaranet.service.PortsService;

@Controller
public class PortController {
	
	protected Logger logger = Logger.getLogger(getClass());

	@Autowired
	private DeviceService deviceService;
	@Autowired
	private PortService portService;
	@Autowired
	private PortsService portsService;
	@Autowired
	private Neo4jTemplate template;

	
	@RequestMapping("/deletePort")
    @Transactional
    public String deletePort(@RequestParam("portName") String portName) {
		logger.info("Deleting Port with Port Name : "+portName);
		Ports foundPort = portsService.findPortByPortName(portName);
    	portsService.deleteEntity(foundPort);
        return "redirect:/listAllDevicesAndPorts";
    }
	
	
	@RequestMapping(value = "/deleteAllPorts", method = RequestMethod.GET)
	@Transactional
	public String deleteAllPorts() throws Exception {
		logger.info("Comes in inside deleteAllPorts()");
		
		Iterable<Port> allPortssFromDb = portService.findAll();
		if(allPortssFromDb.iterator().hasNext()) {
			portService.deleteAll();
		logger.info("Deleted all the Ports from Neo4j.");   		
    	} else {
    		logger.info("No Ports Found/Persisted in Neo4j that are to be deleted!");
    	}
		
		Iterable<Ports> allPortsFromDb = portsService.findAll();
    	if(allPortsFromDb.iterator().hasNext()) {
    		logger.info("Deleting all the Ports from Neo4j");
    		portsService.deleteAll(); //TODO: Need to Delete this....		
    		logger.info("Deleted all the Ports from Neo4j.");   		
    	} else {
    		logger.info("No Ports Found/Persisted in Neo4j that are to be deleted!");
    	}
		return "redirect:/listAllDevicesAndPorts";
	}
	
	
	@RequestMapping(value = "/addPort", method = RequestMethod.POST)
	@Transactional
    public String addPort(@RequestParam("deviceName") String deviceName, @RequestParam("portName") String portName) throws Exception {	
		if((null != deviceName && !deviceName.isEmpty()) && (null != portName && !portName.isEmpty())) {		
	    	logger.info("Adding few dummy ports in the neo4j-graph-db for device : "+deviceName);  	
	    	//Device newDevice = template.save(new Device(deviceName));
	    	String uniqueDevicePortName = deviceName+"-"+portName;
	    	logger.info("Unique Device Port Name : "+uniqueDevicePortName);
	    	
	    	Device device = deviceService.findDeviceByDeviceName(deviceName);
	    	//Port checkIfPortExists = portService.findPortByPortName(uniqueDevicePortName);
	    	Ports checkIfPortExists = null;
	    	if(device != null) {
	    		logger.info("Found Device : "+deviceName);
		    	for (Ports port : device.getHasPorts()) {
					if(port.getPortName().equals(uniqueDevicePortName)) {
						checkIfPortExists = port;
					}
				}
	    	} else {
	    		logger.info("Device IS NULL! : "+deviceName);
	    	}
	    	
	    	if(device != null && checkIfPortExists == null) {
	    		logger.info("Found the device.. Also, Port does not exist already in the DB, so processing further!!!!!");
	    		Ports newPort = new Ports();
	    		newPort.setPortName(uniqueDevicePortName);
	    		device.getHasPorts().add(newPort);
	    		template.save(device);
		    	logger.info("Persisted New Port in the DB & Associated it with the Device.");
	    	} else {
	    		logger.info("Port already exists in Neo4j : With Port Name : "+uniqueDevicePortName);
	    	}
	    	  	
		} else {
			logger.info("Port Name passed in from the template is 'NULL' or 'BLANK'. Therefore, not persisting the null Node in Neo4j.");
		}
        return "redirect:/listAllDevicesAndPorts";
    }
	
}
