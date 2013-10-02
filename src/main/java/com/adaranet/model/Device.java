package com.adaranet.model;

import java.util.HashSet;
import java.util.Set;

import org.neo4j.graphdb.Direction;
import org.springframework.data.neo4j.annotation.Fetch;
import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.Indexed;
import org.springframework.data.neo4j.annotation.NodeEntity;
import org.springframework.data.neo4j.annotation.RelatedToVia;
import org.springframework.data.neo4j.support.index.IndexType;

import com.adaranet.relationships.ConnectedToDevice;
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
    
    @Fetch
    private Set<Ports> hasPorts = new HashSet<Ports>();

    private Set<Port> deviceHasPortsSetMappedByXml = new HashSet<Port>();
    
    @Fetch
    @RelatedToVia(type = RelationshipTypes.CONNECTED_TO_DEVICE, elementClass = ConnectedToDevice.class, direction = Direction.BOTH)
    private Set<ConnectedToDevice> connectsToDevice = new HashSet<ConnectedToDevice>();
    
    public ConnectedToDevice connectsToDevice(Device destDevice, Ports sourcePort, Ports destPort, String linkCapacity, String availableBandwidth, String latency) {
    	
    	String portConnection = sourcePort.getPortName()+'-'+destPort.getPortName();
    	
    	for (ConnectedToDevice connection : connectsToDevice) {
    		System.out.println("CONNECTED-Devices-Ports=========");
    		System.out.println(connection.getAvailableBandwidth());
    		System.out.println(connection.getLatency());
    		System.out.println(connection.getLinkCapacity());
    		
    		if(connection.getConnectedPorts().equals(portConnection)) {
    			System.out.println("FOUND Connection : "+connection.getAvailableBandwidth());
    			this.connectsToDevice.remove(connection);
    			System.out.println("ConnectsToDevice HashSet Size After Removal : "+connectsToDevice.size());
    		} else {
    			System.out.println("Connection NOT Found!");
    		}
    	}

    	ConnectedToDevice connectedToDevice = new ConnectedToDevice(this, destDevice, portConnection, linkCapacity, availableBandwidth, latency);
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
    
    public Device(String deviceName, String deviceType, String cpuUtilization, String numberOfSessions) {
		super();
		this.deviceName = deviceName;
		this.deviceType = deviceType;
		this.cpuUtilization = cpuUtilization;
		this.numberOfSessions = numberOfSessions;
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
    
    public Set<Device> getDeviceConnections() {
    	Set<Device> outGoingConnectingDevicesSet = new HashSet<Device>();
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
