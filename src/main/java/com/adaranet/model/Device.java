package com.adaranet.model;

import java.util.Set;

import javax.persistence.GeneratedValue;

import org.neo4j.graphdb.Direction;
import org.springframework.data.neo4j.annotation.Fetch;
import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.Indexed;
import org.springframework.data.neo4j.annotation.NodeEntity;
import org.springframework.data.neo4j.annotation.RelatedTo;
import org.springframework.data.neo4j.annotation.RelatedToVia;
import org.springframework.data.neo4j.support.index.IndexType;

import com.adaranet.relationships.ConnectedDevices;

@NodeEntity
public class Device {

    @GraphId
    @GeneratedValue
    private Long id;

    @Indexed(indexType = IndexType.FULLTEXT, indexName = "searchByDeviceName")
    private String deviceName;

    @Fetch
    @RelatedToVia(type = "CONNECTS_TO", direction = Direction.BOTH)
    private Set<ConnectedDevices> connectedDevices;
    
    public ConnectedDevices connectsTo(Device endDevice, String connectionProperty) {
    	ConnectedDevices connectedDevices = new ConnectedDevices(this, endDevice, connectionProperty);
    	this.connectedDevices.add(connectedDevices);
    	return connectedDevices;
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
    
    public void setConnectedDevices(Set<ConnectedDevices> connectedDevices) {
		this.connectedDevices = connectedDevices;
	}
    
    public Set<ConnectedDevices> getConnectedDevices() {
		return connectedDevices;
	}
    
    @Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime
				* result
				+ ((connectedDevices == null) ? 0 : connectedDevices.hashCode());
		result = prime * result
				+ ((deviceName == null) ? 0 : deviceName.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
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
		if (connectedDevices == null) {
			if (other.connectedDevices != null)
				return false;
		} else if (!connectedDevices.equals(other.connectedDevices))
			return false;
		if (deviceName == null) {
			if (other.deviceName != null)
				return false;
		} else if (!deviceName.equals(other.deviceName))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}
