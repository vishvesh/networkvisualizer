package com.adaranet.dto;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlRootElement;

import org.codehaus.jackson.annotate.JsonAutoDetect;

@XmlRootElement
public class DeviceDto implements Serializable {

    /**
	 * @author vdeshmukh
	 */
	
	private static final long serialVersionUID = 1L;

	private Long id;
    private String deviceName;
    private String deviceType;
    private String value;
	private String cost;
	private String latency;
	private String linkCapacity;
	private String connectedPorts;
	private String availableBandwidth;
	
	public String getConnectedPorts() {
		return connectedPorts;
	}

	public void setConnectedPorts(String connectedPorts) {
		this.connectedPorts = connectedPorts;
	}

	public String getLinkCapacity() {
		return linkCapacity;
	}

	public void setLinkCapacity(String linkCapacity) {
		this.linkCapacity = linkCapacity;
	}

	public String getAvailableBandwidth() {
		return availableBandwidth;
	}

	public void setAvailableBandwidth(String availableBandwidth) {
		this.availableBandwidth = availableBandwidth;
	}

	public String getLatency() {
		return latency;
	}

	public void setLatency(String latency) {
		this.latency = latency;
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

	public String getDeviceType() {
		return deviceType;
	}

	public void setDeviceType(String deviceType) {
		this.deviceType = deviceType;
	}
}
