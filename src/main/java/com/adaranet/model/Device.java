package com.adaranet.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.neo4j.graphdb.Direction;
import org.springframework.data.neo4j.annotation.Fetch;
import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.Indexed;
import org.springframework.data.neo4j.annotation.NodeEntity;
import org.springframework.data.neo4j.annotation.RelatedToVia;

import com.adaranet.relationships.ConnectedDevices;
import com.adaranet.relationships.ConnectsToDevice;
import com.adaranet.relationships.ConnectsToPort;
import com.adaranet.relationships.HasPort;
//import javax.persistence.GeneratedValue;

@NodeEntity
public class Device {

	/**
	 * @author vdeshmukh
	 */

    @GraphId
    private Long id;

    //@Indexed(indexType = IndexType.FULLTEXT, indexName = "searchByDeviceName")
    @Indexed(unique = true)
    private String deviceName;
    
    private String deviceType;
    
    @Fetch
    @RelatedToVia(type = "HAS_PORT", elementClass = HasPort.class, direction = Direction.OUTGOING)
    private Set<HasPort> outgoingConnectingPorts = new HashSet<HasPort>();

    @Fetch
    @RelatedToVia(type = "CONNECTS_TO_DEVICE", direction = Direction.INCOMING, elementClass = ConnectsToDevice.class)
    private Set<ConnectsToDevice> incomingPorts = new HashSet<ConnectsToDevice>();
    
    public Port connectPortsAndDestinationDevice(Port sourcePort, Port destPort, Device destDevice) {
    	HasPort hasPort = new HasPort(this, sourcePort);
    	Port connectedPort = hasPort.getConnectedPort();
    	//connectedPort.connectsToDevice(destDevice);
    	this.outgoingConnectingPorts.add(hasPort);
    	connectedPort.connectsToPort(destPort);
    	destPort.connectsToDevice(destDevice);
    	return destPort;
    }

    @Fetch
    //@JsonBackReference
    @RelatedToVia(type = "CONNECTED_TO_DEVICE", elementClass = ConnectedDevices.class, direction = Direction.OUTGOING)
    private Set<ConnectedDevices> outgoingDeviceConnections = new HashSet<ConnectedDevices>();
    
    @Fetch
    @RelatedToVia(type = "CONNECTED_TO_DEVICE", elementClass = ConnectedDevices.class, direction = Direction.INCOMING)
    private Set<ConnectedDevices> incomingDeviceConnections = new HashSet<ConnectedDevices>();

    public void connectsToDevice(Device endDevice, String value, String cost) {
    	System.out.println("Inside connectsToDevice() : Saving all Outgoing Devices.");
    	ConnectedDevices connectedDevices = new ConnectedDevices(this, endDevice, value, cost);
    	this.outgoingDeviceConnections.add(connectedDevices);
    	System.out.println("Size of Outgoing Device Connections : "+outgoingDeviceConnections.size());
    }
      
    public Set<ConnectedDevices> getOutgoingDeviceConnections() {
		return outgoingDeviceConnections;
	}
    
    public Set<ConnectedDevices> getIncomingDeviceConnections() {
		return incomingDeviceConnections;
	}
       
    public Device() {
    	
	}
    
    public Device(String deviceName) {
		this.deviceName = deviceName;
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
    
    public Set<HasPort> getOutgoingConnectingPorts() {
		return outgoingConnectingPorts;
	}

    public Set<Port> getOutgoingConnectingPortsFromDevice() {
    	Set<Port> outGoingConnectingPortsSet = new HashSet<Port>();
    	for (HasPort hasPort : outgoingConnectingPorts) {
			outGoingConnectingPortsSet.add(hasPort.getConnectedPort());
		}
		return outGoingConnectingPortsSet;
	}
    
    public Set<Port> getIncomingConnectingPortsToDevice() {
    	Set<Port> incomingConnectingPortsSet = new HashSet<Port>();
    	for (ConnectsToDevice port : incomingPorts) {
    		incomingConnectingPortsSet.add(port.getSourcePort());
		}
		return incomingConnectingPortsSet;
	}
}
