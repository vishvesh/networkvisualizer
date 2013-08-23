package com.adaranet.relationships;

import org.springframework.data.neo4j.annotation.EndNode;
import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.RelationshipEntity;
import org.springframework.data.neo4j.annotation.StartNode;

import com.adaranet.model.Device;

@RelationshipEntity(type = "CONNECTED_TO")
public class ConnectedDevices {

	@GraphId
	private Long id;
	
	@StartNode
	private Device startDevice;
	@EndNode
	private Device endDevice;
	
	private String connectionProperty;
	
	public ConnectedDevices() {
		
	}
	
	public ConnectedDevices(Device startDevice, Device endDevice, String connectionProperty) {
		this.startDevice = startDevice;
		this.endDevice = endDevice;
		this.connectionProperty = connectionProperty;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public Long getId() {
		return id;
	}

	public Device getStartDevice() {
		return startDevice;
	}

	public void setStartDevice(Device startDevice) {
		this.startDevice = startDevice;
	}

	public Device getEndDevice() {
		return endDevice;
	}

	public void setEndDevice(Device endDevice) {
		this.endDevice = endDevice;
	}

	public String getConnectionProperty() {
		return connectionProperty;
	}

	public void setConnectionProperty(String connectionProperty) {
		this.connectionProperty = connectionProperty;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime
				* result
				+ ((connectionProperty == null) ? 0 : connectionProperty
						.hashCode());
		result = prime * result
				+ ((endDevice == null) ? 0 : endDevice.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result
				+ ((startDevice == null) ? 0 : startDevice.hashCode());
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
		ConnectedDevices other = (ConnectedDevices) obj;
		if (connectionProperty == null) {
			if (other.connectionProperty != null)
				return false;
		} else if (!connectionProperty.equals(other.connectionProperty))
			return false;
		if (endDevice == null) {
			if (other.endDevice != null)
				return false;
		} else if (!endDevice.equals(other.endDevice))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (startDevice == null) {
			if (other.startDevice != null)
				return false;
		} else if (!startDevice.equals(other.startDevice))
			return false;
		return true;
	}

}
