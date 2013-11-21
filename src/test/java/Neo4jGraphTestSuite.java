import java.util.Random;
import java.util.UUID;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.support.Neo4jTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import com.adaranet.model.Device;
import com.adaranet.model.Ports;
import com.adaranet.service.DeviceService;
import com.adaranet.service.PortsService;
//import org.springframework.data.neo4j.transaction.Neo4jTransactional;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:springConfig/applicationContext*.xml" })
public class Neo4jGraphTestSuite {

	@Autowired
	private Neo4jTemplate template;
	@Autowired
	private DeviceService deviceService;
	@Autowired
	private PortsService portsService;
	
	private static int NUMBER_OF_DEVICES = 25;
	private static int NUMBER_OF_PORTS = 3;
	//private static Logger logger = Logger.getLogger(getClass());
	
	private static final int NUM_CHARS = 20;
	private static String chars = "abcdefghijklmonpqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	private static Random random = new Random();
	//private static Map<Integer, String> deviceMap = new HashMap<Integer, String>();
	
	public static String getUniqueID() {
		char[] buf = new char[NUM_CHARS];
		for (int i = 0; i < buf.length; i++) {
			buf[i] = chars.charAt(random.nextInt(chars.length()));
		}
		return new String(buf);
	}
	
	/*@Rollback(false)
    @BeforeTransaction
    public void cleanUpGraph() {
		System.out.println("***** Cleaning Neo4jDatabase! *****");
        Neo4jHelper.cleanDb(template);
        System.out.println("***** Cleaned Neo4jDatabase! *****");
    }*/ 

	@Test
	@Transactional
	public void beforeLoad() {
	try {
			System.out.println("***** Cleaning Neo4jDatabase! *****");
			if(deviceService.count() > 0) {
	    		System.out.println("Devices present in the Graph : Cleaning them! : Count : "+deviceService.count());
				deviceService.deleteAll();
			} else {
				System.out.println("No Devices Present in the Graph!");
			}
	    	if(portsService.count() > 0) {
	    		System.out.println("Ports present in the Graph : Cleaning them! : Count : "+portsService.count());
	    		portsService.deleteAll();
	    	} else {
	    		System.out.println("No Ports Present in the Graph!");
	    	}
			System.out.println("***** Neo4jDatabase Cleaned Successfully! *****");
			//Log4jConfigurer.initLogging( "classpath:propFiles/log4j.properties" );
	    }
	    catch( Exception ex ) {
	      ex.printStackTrace();
	    }
	}

	@Test
	@Transactional
	public void createDevices() throws Exception {
		System.out.println("***** TESTING METHOD createDevices() *****");

		for(int i = 0; i < NUMBER_OF_DEVICES; i++) {
			//String uniqueId = getUniqueID();
			String uniqueId = "Device"+i;
			System.out.println(i+ 
								" : Unique ID : "+uniqueId+
								" : UUID : "+UUID.randomUUID().toString()+
								" : Replaced UUID : "+UUID.randomUUID().toString().replaceAll("-", ""));
			
			//Device device = deviceService.saveEntity(new Device(uniqueId));
			Device device = new Device(uniqueId);
			template.save(device);
			//deviceService.saveEntity(device);
			//Thread.sleep(1 * 200);
			for(int j = 0; j < NUMBER_OF_PORTS; j++) {
				Ports newPort = new Ports();
				System.out.println("Port Name Created : "+(uniqueId+"-em"+j));
	    		newPort.setPortName(uniqueId+"-em"+j);
	    		device.getHasPorts().add(newPort);
	    		template.save(device);
			}
		}
	}
	
	/*@Test
	@Transactional
	public void connectPorts() throws Exception {
		System.out.println("***** TESTING METHOD connectPorts() *****");
		//MockHttpServletRequest request = new MockHttpServletRequest("POST", "/networkvisualizer/connectDevicesViaPorts");
		//MockHttpServletResponse response = new MockHttpServletResponse();
		List<Device> devices = (List<Device>) IteratorUtil.asCollection(deviceService.findAll());
		System.out.println("Devices Found : Count/Size : "+devices.size());
		for(int i = 0; i < devices.size(); i++) {
			Device startDevice = devices.get(AppUtils.generateRandomInt(devices.size() - 1));
			Device endDevice = devices.get(AppUtils.generateRandomInt(devices.size() - 1));
			String startDeviceName = startDevice.getDeviceName();
			String endDeviceName = endDevice.getDeviceName();
			if(startDeviceName == endDeviceName) {
				System.out.println("Start Device == End Device. : Start Device : "+startDeviceName+" : End Device : "+endDeviceName);
			} else {
				System.out.println("Start Device != End Device. : Start Device : "+startDeviceName+" : End Device : "+endDeviceName);
				Set<Ports> startDevicePortsList = (Set<Ports>) startDevice.getHasPorts();
				Set<Ports> endDevicePortsList = (Set<Ports>) endDevice.getHasPorts();
				Object[] startDevicePorts =  startDevicePortsList.toArray();
				Object[] endDevicePorts = endDevicePortsList.toArray();
				System.out.println("Length : "+startDevicePortsList.size()+" : "+startDevicePorts.length+" : "+endDevicePorts.length);
				//for(int j = 0; j < startDevicePorts.length; j ++) {
				Ports startPort = (Ports) startDevicePorts[0];
				Ports endPort = (Ports) endDevicePorts[0];
				String startPortName = startPort.getPortName();
				String endPortName = endPort.getPortName();
				String originalPortNames = AppUtils.replacePorts(startPortName)+'-'+AppUtils.replacePorts(endPortName);
				ConnectedToDevice connectedToDevice = startDevice.connectsToDevice(endDevice,
																				startPort,
																				endPort,
														    					originalPortNames,
														    					Integer.toString(AppUtils.generateRandomInt(100)),
														    					Integer.toString(AppUtils.generateRandomInt(100)),
														    					Integer.toString(AppUtils.generateRandomInt(100)));
				template.save(connectedToDevice);
				System.out.println("Connected Relationship Successfully!");
				System.out.println("Start Device : "+startDeviceName+
									" : Start Port : "+startPortName+
									" : End Device : "+endDeviceName+
									" : End Port : "+endPortName);
				//}
			}
		}
		System.out.println("Connection Completed Sucessfully!");
		System.out.println("***** TESTING METHOD connectPorts() *****");
	}*/
	
	@Test
	@Transactional
	public void showDevices() throws Exception {
		System.out.println("***** TESTING METHOD showDevices() *****");
		Iterable<Device> devices = deviceService.findAll();
		System.out.println("Devices Found : Count : "+deviceService.count());
		for (Device device : devices) {
			System.out.println("ALL DEVICES IN THE LOOP : "+device.getDeviceName());
		}
		System.out.println("***** TESTING METHOD showDevices() *****");
	}
	
	/*@Test
	@Transactional
	public void testRelationship() throws Exception {
		//System.out.println("Initiating test for Relationship.");
		
		FirstEntity persistedEntity = template.findOne(firstEntity.getId(), FirstEntity.class);

		assertThat(persistedEntity.getId(), notNullValue());
		assertThat(persistedEntity.getValue(), equalTo(firstEntity.getValue()));
		assertThat(persistedEntity.getEntityRelationships(), hasSize(3));
		
		Device one = new Device("One");
		Device two = new Device("Two");
		
		deviceService.save(one);
		deviceService.save(two);
		
		Iterable<Device> devices = deviceRepository.findAll();
		
		for (Device device : devices) {
			//System.out.println("Device Name : "+device.getDeviceName());
			System.out.println("Device Name : "+device.getDeviceName());
		}
		
		//System.out.println("ONe's ID : "+one.getId());
		//Device found = template.findOne(one.getId(), Device.class);
		
		//System.out.println("Found prop by val : "+found.getId());
		
		//one.connectsTo(two, "Sample Connection");
		//ConnectedDevices c = template.createRelationshipBetween(one, two, ConnectedDevices.class, "CONNECTED_TO", false);
		//template.save(c);
		
		//one.connectsToDevice(two);
		//deviceService.save(one);
		
		System.out.println("After executing all the tests!");
		
		Device theDevice = deviceRepository.findByPropertyValue("deviceName", "One");
		if(theDevice != null)
			System.out.println("FOUND THE DEVICE : "+theDevice.getDeviceName());
				
		//System.out.println("Test Start");
		System.out.println("Initiating test for Relationship.");
		assertThat("One", equalTo("One"));
		//System.out.println("Test End");
	}*/
	
}
