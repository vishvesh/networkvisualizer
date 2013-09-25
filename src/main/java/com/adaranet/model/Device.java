package com.adaranet.model;

import java.util.HashSet;
import java.util.Set;

import org.neo4j.graphdb.Direction;
import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.Indexed;
import org.springframework.data.neo4j.annotation.NodeEntity;
import org.springframework.data.neo4j.annotation.RelatedToVia;
import org.springframework.data.neo4j.support.index.IndexType;

import com.adaranet.relationships.HasPort;
import com.adaranet.util.RelationshipTypes;
//import com.adaranet.relationships.ConnectsToDevice;
//import javax.persistence.GeneratedValue;

@NodeEntity
public class Device {

	/**
	 * @author vdeshmukh
	 */

    @GraphId
    private Long id;
    //@Indexed(unique = true)
    @Indexed(unique = true, indexType = IndexType.FULLTEXT, indexName = "searchByDeviceName")
    private String deviceName;
    private String deviceType;
    private String cpuUtilization;
    private String numberOfSessions;
    
    private Set<Port> deviceHasPortsSetMappedByXml = new HashSet<Port>();
    
    //@Fetch
    @RelatedToVia(type = RelationshipTypes.HAS_PORT, elementClass = HasPort.class, direction = Direction.OUTGOING)
    private Set<HasPort> hasPorts = new HashSet<HasPort>();
    
    public Port connectPortsAndDestinationDevice(Port sourcePort, Port destPort, Device destDevice) {
    	HasPort hasPort = new HasPort(this, sourcePort);
    	Port connectedPort = hasPort.getConnectedPort();
    	this.hasPorts.add(hasPort);
    	connectedPort.connectsToPort(destPort);
    	return destPort;
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
    
    public Set<HasPort> getHasPorts() {
		return hasPorts;
	}

    public Set<Port> getOutgoingConnectingPortsFromDevice() {
    	Set<Port> outGoingConnectingPortsSet = new HashSet<Port>();
    	for (HasPort hasPort : hasPorts) {
			outGoingConnectingPortsSet.add(hasPort.getConnectedPort());
		}
		return outGoingConnectingPortsSet;
	}
    
    /*public Set<Port> getIncomingConnectingPortsToDevice() {
    	Set<Port> incomingConnectingPortsSet = new HashSet<Port>();
    	for (ConnectsToDevice port : incomingPorts) {
    		incomingConnectingPortsSet.add(port.getSourcePort());
		}
		return incomingConnectingPortsSet;
	}*/
}
