package com.adaranet.service.impl;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.conversion.EndResult;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.adaranet.model.Device;
import com.adaranet.repository.DeviceRepository;
import com.adaranet.service.DeviceService;

@Service
@Transactional
public class DeviceServiceImpl implements DeviceService {
	
	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private DeviceRepository deviceRepository;
	
	public Device findDeviceByDeviceName(String deviceName) {
		logger.info("Delegating request for findDeviceByDeviceName to deviceRepository for device with Name : "+deviceName);
		return deviceRepository.findDeviceByDeviceName(deviceName);
	}

	public List<Device> getFirstChildConnectedDevice(String deviceName) {
		return deviceRepository.getFirstChildConnectedDevice(deviceName);
	}

	public List<Device> getAllChildConnectedDevices(String deviceName) {
		return deviceRepository.getAllChildConnectedDevices(deviceName);
	}

	@Transactional
	public Device saveEntity(Device entity) {
		return deviceRepository.save(entity);
	}

	@Transactional
	public void deleteEntity(Device entity) {
		deviceRepository.delete(entity);
	}

	@Transactional
	public EndResult<Device> findAll() {
		return deviceRepository.findAll();
	}

	@Transactional
	public void deleteAll() {
		deviceRepository.deleteAll();
	}

	
	
}
