package com.adaranet.model;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

//import javax.persistence.GeneratedValue;

import org.apache.log4j.Logger;
import org.neo4j.graphdb.Direction;
import org.springframework.data.annotation.Transient;
import org.springframework.data.neo4j.annotation.Fetch;
import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.Indexed;
import org.springframework.data.neo4j.annotation.NodeEntity;
import org.springframework.data.neo4j.annotation.RelatedTo;
import org.springframework.data.neo4j.annotation.RelatedToVia;
import org.springframework.data.neo4j.support.index.IndexType;

import com.adaranet.controller.DeviceController;
import com.adaranet.relationships.ConnectedDevices;

@NodeEntity
public class Device extends DeviceController implements Serializable {

	/**
	 * @author vdeshmukh
	 */
	
	private static final long serialVersionUID = 1L;
	
    @GraphId
    private Long id;

    //@Indexed(indexType = IndexType.FULLTEXT, indexName = "searchByDeviceName")
    @Indexed(unique = true)
    private String deviceName;
    
    private String deviceType;
    
    //@RelatedToVia(type = "CONNECTED_TO_DEVICE", elementClass = ConnectedDevices.class, direction = Direction.BOTH)
    //private ConnectedDevices connectedDevices;

    @Fetch
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
    
    public Set<ConnectedDevices> getOutgoingDeviceConnections() {
		return outgoingDeviceConnections;
	}
    
    public Set<ConnectedDevices> getIncomingDeviceConnections() {
		return incomingDeviceConnections;
	}
    
    public void setDeviceType(String deviceType) {
		this.deviceType = deviceType;
	}
    
    public String getDeviceType() {
		return deviceType;
	}

	/*@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((deviceName == null) ? 0 : deviceName.hashCode());
		result = prime * result
				+ ((deviceType == null) ? 0 : deviceType.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime
				* result
				+ ((incomingDeviceConnections == null) ? 0
						: incomingDeviceConnections.hashCode());
		result = prime * result + ((logger == null) ? 0 : logger.hashCode());
		result = prime
				* result
				+ ((outgoingDeviceConnections == null) ? 0
						: outgoingDeviceConnections.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Device other = (Device) obj;
		if (deviceName == null) {
			if (other.deviceName != null)
				return false;
		} else if (!deviceName.equals(other.deviceName))
			return false;
		if (deviceType == null) {
			if (other.deviceType != null)
				return false;
		} else if (!deviceType.equals(other.deviceType))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (incomingDeviceConnections == null) {
			if (other.incomingDeviceConnections != null)
				return false;
		} else if (!incomingDeviceConnections
				.equals(other.incomingDeviceConnections))
			return false;
		if (logger == null) {
			if (other.logger != null)
				return false;
		} else if (!logger.equals(other.logger))
			return false;
		if (outgoingDeviceConnections == null) {
			if (other.outgoingDeviceConnections != null)
				return false;
		} else if (!outgoingDeviceConnections
				.equals(other.outgoingDeviceConnections))
			return false;
		return true;
	}*/

    
    /*public ConnectedDevices getConnectedDevices() {
		return connectedDevices;
	}
    
    public void setConnectedDevices(ConnectedDevices connectedDevices) {
		this.connectedDevices = connectedDevices;
	}*/
    

}
