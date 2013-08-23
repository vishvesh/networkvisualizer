package com.adaranet.model;

import java.util.Set;

import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.Indexed;
import org.springframework.data.neo4j.annotation.NodeEntity;
import org.springframework.data.neo4j.annotation.RelatedTo;
import org.springframework.data.neo4j.support.index.IndexType;

@NodeEntity
public class Device {

    @GraphId
    private Long id;

    @Indexed(indexType = IndexType.FULLTEXT, indexName = "searchByDeviceName")
    private String deviceName;

    @RelatedTo(type = "CONNECTS_TO")
    private Set<Device> connectedDevices;
    
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
    
    public void setConnectedDevices(Set<Device> connectedDevices) {
		this.connectedDevices = connectedDevices;
	}
    
    public Set<Device> getConnectedDevices() {
		return connectedDevices;
	}

}
