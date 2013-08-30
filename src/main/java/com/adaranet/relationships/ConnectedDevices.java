package com.adaranet.relationships;

import org.springframework.data.neo4j.annotation.EndNode;
import org.springframework.data.neo4j.annotation.Fetch;
import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.RelationshipEntity;
import org.springframework.data.neo4j.annotation.StartNode;

import com.adaranet.model.Device;

@RelationshipEntity(type = "CONNECTED_TO_DEVICE")
public class ConnectedDevices {

	@GraphId
	private Long id;
	
	@Fetch
	@StartNode
	private Device startDevice;
	
	@Fetch
	@EndNode
	private Device endDevice;
	
	private String value;
	private String cost;
	
	public ConnectedDevices() {
		
	}
	
	public ConnectedDevices(Device startDevice, Device endDevice) {
		this.startDevice = startDevice;
		this.endDevice = endDevice;
	}
	
	public ConnectedDevices(Device startDevice, Device endDevice, String value, String cost) {
		this.startDevice = startDevice;
		this.endDevice = endDevice;
		this.value = value;
		this.cost = cost;
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

	public void setValue(String value) {
		this.value = value;
	}
	
	public String getValue() {
		return value;
	}
	
	public void setCost(String cost) {
		this.cost = cost;
	}

	public String getCost() {
		return cost;
	}

	/*@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((cost == null) ? 0 : cost.hashCode());
		result = prime * result
				+ ((endDevice == null) ? 0 : endDevice.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result
				+ ((startDevice == null) ? 0 : startDevice.hashCode());
		result = prime * result + ((value == null) ? 0 : value.hashCode());
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
		if (cost == null) {
			if (other.cost != null)
				return false;
		} else if (!cost.equals(other.cost))
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
		if (value == null) {
			if (other.value != null)
				return false;
		} else if (!value.equals(other.value))
			return false;
		return true;
	}
*/
}
