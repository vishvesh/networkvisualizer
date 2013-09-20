package com.adaranet.repository;

import java.util.List;

import org.springframework.data.neo4j.annotation.Indexed;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.annotation.QueryType;

import com.adaranet.model.Device;
import com.adaranet.repository.generic.GenericRepository;

public interface DeviceRepository extends GenericRepository<Device> {
	
	/**
	 * @author vdeshmukh
	 * 
	 * Spring-Data-Neo4j implements the interface automatically.
	 * So, we do not have to worry about implementing this interface,
	 * but we can extend it.
	 */
	
	/**
	 * This method is mapped automatically by Spring-Data-Neo4j
	 * as @NodeEntity(com.adaranet.model.Device) has the 
	 * annotation @Indexed(unique = true) on the field 'deviceName'. 
	 * @param deviceName
	 * @return
	 */
	public Device findDeviceByDeviceName(String deviceName);
   
	/**
	 * Neo4j's Cypher query to get the First Child Connected Device.
	 * @param deviceName
	 * @return
	 */
	@Query(type = QueryType.Cypher, value = "START root = node:Device(deviceName = {0}) " +
											"MATCH (root) <- [:CONNECTED_TO_DEVICE] - devices " +
											"RETURN devices")
	public List<Device> getFirstChildConnectedDevice(String deviceName);
	
	/**
	 * Neo4j's Cypher query to get All the Child Connected Devices.
	 * @param deviceName
	 * @return
	 */
	@Query(type = QueryType.Cypher, value = "START root = node:Device(deviceName = {0}) " +
											"MATCH (root) - [connections:CONNECTED_TO_DEVICE*1..] -> devices " +
											"RETURN devices")
	public List<Device> getAllChildConnectedDevices(String deviceName);
	
}
