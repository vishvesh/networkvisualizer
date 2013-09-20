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
import com.adaranet.relationships.HasPort;
import com.adaranet.service.DeviceService;
import com.adaranet.service.PortService;

@Controller
public class PortController {
	
	protected Logger logger = Logger.getLogger(getClass());

	@Autowired
	private DeviceService deviceService;	
	@Autowired
	private PortService portService;
	@Autowired
	private Neo4jTemplate template;

	
	@RequestMapping("/deletePort")
    @Transactional
    public String deletePort(@RequestParam("portName") String portName) {
		logger.info("Deleting Port with Port Name : "+portName);
    	Port foundPort = portService.findPortByPortName(portName);
    	portService.deleteEntity(foundPort);
        return "redirect:/listAllDevicesAndPorts";
    }
	
	
	@RequestMapping(value = "/deleteAllPorts", method = RequestMethod.GET)
	@Transactional
	public String deleteAllPorts() throws Exception {
		logger.info("Comes in inside deleteAllPorts()");
		Iterable<Port> allPortsFromDb = portService.findAll();
    	if(allPortsFromDb.iterator().hasNext()) {
    		logger.info("Deleting all the Ports from Neo4j");
    		portService.deleteAll(); //TODO: Need to Delete this....		
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
	    	Port checkIfPortExists = portService.findPortByPortName(uniqueDevicePortName);
	    	
	    	if(device != null && checkIfPortExists == null) {
	    		logger.info("Found the device.. Also, Port does not exist already in the DB, so processing further!!!!!");
	    		Port newPort = new Port(uniqueDevicePortName, "Ethernet");
	    		template.save(newPort);
	    		HasPort hasPort = new HasPort();
	    		hasPort.setStartDevice(device);
	    		hasPort.setConnectedPort(newPort);
	    		template.save(hasPort);
		    	//portService.saveEntity(newPort);
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
