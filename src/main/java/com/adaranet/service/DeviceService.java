package com.adaranet.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.adaranet.model.Device;
import com.adaranet.service.generic.GenericService;

@Service
@Transactional
public interface DeviceService extends GenericService<Device> {

	public Device findDeviceByDeviceName(String deviceName);
	public List<Device> getFirstChildConnectedDevice(String deviceName);
	public List<Device> getAllChildConnectedDevices(String deviceName);
	
}
