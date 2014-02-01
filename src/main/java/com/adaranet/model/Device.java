package com.adaranet.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import org.neo4j.graphdb.Direction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Transient;
import org.springframework.data.neo4j.annotation.Fetch;
import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.Indexed;
import org.springframework.data.neo4j.annotation.NodeEntity;
import org.springframework.data.neo4j.annotation.RelatedToVia;
import org.springframework.data.neo4j.support.Neo4jTemplate;
import org.springframework.data.neo4j.support.index.IndexType;

import com.adaranet.relationships.ConnectedToDevice;
import com.adaranet.relationships.HasPort;
import com.adaranet.util.RelationshipTypes;

@NodeEntity
public class Device {

	/**
	 * @author vdeshmukh
	 */

    @GraphId
    private Long id;
	@Indexed(unique = true, indexType = IndexType.FULLTEXT, indexName = "searchByDeviceName")
    private String deviceName;
    private String deviceType;
    private String cpuUtilization;
    private String numberOfSessions;
    
    /*@Autowired
    @Transient
	private transient Neo4jTemplate template;*/
    
    @Fetch
    //@RelatedToVia(type = RelationshipTypes.HAS_PORT, elementClass = HasPort.class, direction = Direction.OUTGOING)
    //private Set<Ports> hasPorts = new LinkedHashSet<Ports>(); //If the insertion/iteration order is important!
    private Set<Ports> hasPorts = new HashSet<Ports>();
    
    @Fetch
    //private Set<Device> hasVirtualMachines = new LinkedHashSet<Device>(); //If the insertion/iteration order is important!
    private Set<Device> hasVirtualMachines = new HashSet<Device>();

    private Set<Port> deviceHasPortsSetMappedByXml = new HashSet<Port>();
    
    //@Fetch
    @RelatedToVia(type = RelationshipTypes.CONNECTED_TO_DEVICE, elementClass = ConnectedToDevice.class, direction = Direction.OUTGOING)
    private Set<ConnectedToDevice> connectsToDevice = new HashSet<ConnectedToDevice>();
    
    public ConnectedToDevice connectsToDevice(Device destDevice, Ports sourcePort, Ports destPort, String originalPortNames, String linkCapacity, String availableBandwidth, String latency) {
    	
    	String portConnection = sourcePort.getPortName()+'-'+destPort.getPortName();
    	ConnectedToDevice foundConnection = null;
    	System.out.println("ConnectsToDevice Initial Size : Before Adding/Deleting : "+this.connectsToDevice.size());
    	
    	for (ConnectedToDevice connection : connectsToDevice) {
    		System.out.println("CONNECTED-Devices-Ports=========");
    		System.out.println(connection.getId());
    		System.out.println(connection.getAvailableBandwidth());
    		System.out.println(connection.getLatency());
    		System.out.println(connection.getLinkCapacity());
    		
    		if(connection.getConnectedPorts().equals(portConnection)) {
    			System.out.println("FOUND Connection : "+connection.getAvailableBandwidth()+ " : ID : "+connection.getId());
    			foundConnection = connection;
    		} else {
    			System.out.println("Connection NOT Found!");
    		}
    	}
    	
    	if(foundConnection != null) {
    		//template.getRelationship(foundConnection.getId()).delete();
    		System.out.println("FOUND CONNECTION ID : "+foundConnection.getId());
    		this.connectsToDevice.remove(foundConnection);
    		System.out.println("foundConnection != null : ConnectsToDevice HashSet Size After Removal : "+this.connectsToDevice.size());
    		for (ConnectedToDevice connection : connectsToDevice) {
    			System.out.println("How is it possible? : "+connection.getAvailableBandwidth() + " : ID : "+connection.getId());
			}
    	}

    	ConnectedToDevice connectedToDevice = new ConnectedToDevice(this, destDevice, portConnection, originalPortNames, linkCapacity, availableBandwidth, latency);
    	this.connectsToDevice.add(connectedToDevice);
    	System.out.println("ConnectsToDevice HashSet Size After!! : "+connectsToDevice.size());
    	
    	return connectedToDevice;
    }

    public Device() {
    	
	}
    
    public Device(String deviceName) {
    	super();
		this.deviceName = deviceName;
	}
    
    public Device(String deviceName, String deviceType) {
    	super();
		this.deviceName = deviceName;
    	this.deviceType = deviceType;
    }
    
    public Device(String deviceName, String deviceType, String cpuUtilization, String numberOfSessions) {
		super();
		this.deviceName = deviceName;
		this.deviceType = deviceType;
		this.cpuUtilization = cpuUtilization;
		this.numberOfSessions = numberOfSessions;
	}
    
    public void setHasVirtualMachines(Set<Device> hasVirtualMachines) {
		this.hasVirtualMachines = hasVirtualMachines;
	}
    
    public Set<Device> getHasVirtualMachines() {
		return hasVirtualMachines;
	}
    
    public void setHasPorts(Set<Ports> test) {
		this.hasPorts = test;
	}
    
    public Set<Ports> getHasPorts() {
		return hasPorts;
	}
 
    public void setDeviceHasPortsSetMappedByXml(Set<Port> deviceHasPortsSetMappedByXml) {
		this.deviceHasPortsSetMappedByXml = deviceHasPortsSetMappedByXml;
	}
    
    public Set<Port> getDeviceHasPortsSetMappedByXml() {
		return deviceHasPortsSetMappedByXml;
	}

    public void setCpuUtilization(String cpuUtilization) {
		this.cpuUtilization = cpuUtilization;
	}
    
    public String getCpuUtilization() {
		return cpuUtilization;
	}
    
    public void setNumberOfSessions(String numberOfSessions) {
		this.numberOfSessions = numberOfSessions;
	}
    
    public String getNumberOfSessions() {
		return numberOfSessions;
	}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }
    
    public void setDeviceType(String deviceType) {
		this.deviceType = deviceType;
	}
    
    public String getDeviceType() {
		return deviceType;
	}
    
    public Set<ConnectedToDevice> getConnectsToDevice() {
		return connectsToDevice;
	}
    
    public List<Device> getDeviceConnections() {
    	List<Device> outGoingConnectingDevicesSet = new ArrayList<Device>();
    	for (ConnectedToDevice connectedToDevice : connectsToDevice) {
    		outGoingConnectingDevicesSet.add(connectedToDevice.getDestinationDevice());
		}
		return outGoingConnectingDevicesSet;
	}
    
    /*public Set<HasPort> getHasPorts() {
		return hasPorts;
	}

    public Set<Port> getOutgoingConnectingPortsFromDevice() {
    	Set<Port> outGoingConnectingPortsSet = new HashSet<Port>();
    	for (HasPort hasPort : hasPorts) {
			outGoingConnectingPortsSet.add(hasPort.getConnectedPort());
		}
		return outGoingConnectingPortsSet;
	}*/
    
    /*public Set<Port> getIncomingConnectingPortsToDevice() {
    	Set<Port> incomingConnectingPortsSet = new HashSet<Port>();
    	for (ConnectsToDevice port : incomingPorts) {
    		incomingConnectingPortsSet.add(port.getSourcePort());
		}
		return incomingConnectingPortsSet;
	}*/
}
