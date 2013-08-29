package com.adaranet.service;

import java.util.List;
import java.util.Map;

import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.annotation.QueryType;
import org.springframework.data.neo4j.repository.GraphRepository;

import com.adaranet.model.Device;

public interface DeviceService extends GraphRepository<Device> {
	
	public Device findDeviceByDeviceName(String deviceName);
   
	@Query(type = QueryType.Cypher, value = "START root = node:Device(deviceName = {0}) MATCH (root) <- [:CONNECTED_TO_DEVICE] - devices RETURN devices")
	public List<Device> getFirstChildConnectedDevice(String deviceName);
	
	@Query(type = QueryType.Cypher, value = "START root = node:Device(deviceName = {0}) MATCH (root) <- [connections:CONNECTED_TO_DEVICE*1..] - devices RETURN devices")
	public List<Device> getAllChildConnectedDevices(String deviceName);
	
}
