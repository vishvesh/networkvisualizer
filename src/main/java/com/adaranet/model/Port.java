package com.adaranet.model;

import java.util.HashSet;
import java.util.Set;

import org.neo4j.graphdb.Direction;
import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.Indexed;
import org.springframework.data.neo4j.annotation.NodeEntity;
import org.springframework.data.neo4j.annotation.RelatedTo;
import org.springframework.data.neo4j.annotation.RelatedToVia;

import com.adaranet.relationships.ConnectsToDevice;

@NodeEntity
public class Port {

	/**
	 * @author vdeshmukh
	 */
	
    @GraphId
    private Long id;

    @Indexed
    private String portName;
    private String portType;
    
    @RelatedToVia(type = "CONNECTS_TO_DEVICE", direction = Direction.OUTGOING, elementClass = ConnectsToDevice.class)
    private Set<ConnectsToDevice> connectedDevices = new HashSet<ConnectsToDevice>();
    
    public void connectsToDevice(Device destDevice) {
    	ConnectsToDevice connectsToDevice = new ConnectsToDevice(this, destDevice);
    	this.connectedDevices.add(connectsToDevice);
    }
    
    public Port() {
    	
	}
    
    public Port(String portName, String portType) {
    	this.portName = portName;
    	this.portType = portType;
    }
    
    public void setPortName(String portName) {
		this.portName = portName;
	}
    
    public String getPortName() {
		return portName;
	}
    
    public void setPortType(String portType) {
		this.portType = portType;
	}
    
    public String getPortType() {
		return portType;
	}
    
    public Set<ConnectsToDevice> getConnectedDevice() {
		return connectedDevices;
	}
}
