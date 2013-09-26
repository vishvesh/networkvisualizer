package com.adaranet.model;

import java.util.HashSet;
import java.util.Set;

import org.neo4j.graphdb.Direction;
import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.Indexed;
import org.springframework.data.neo4j.annotation.NodeEntity;
import org.springframework.data.neo4j.annotation.RelatedToVia;
import org.springframework.data.neo4j.support.index.IndexType;

import com.adaranet.relationships.ConnectsToPort;
import com.adaranet.util.RelationshipTypes;
//import com.adaranet.relationships.ConnectsToDevice;

@NodeEntity
public class Port {

	/**
	 * @author vdeshmukh
	 */
	
    @GraphId
    private Long id;
    //@Indexed(unique = true)
    @Indexed(unique = true, indexType = IndexType.FULLTEXT, indexName = "searchByPortName")
    private String portName;
    private String portType;
    private String packetsIn;
    private String packetsOut;
    private String bitsIn;
    private String bitsOut;
    
    /*@Query(type = QueryType.Cypher, value = "START root = node({self}) " +
			"MATCH (root) - [relationship:CONNECTS_TO_PORT] -> port " +
			"RETURN relationship")
    private Iterable<ConnectsToPort> connectedToPorts;
    
    @Autowired
    private transient PortService portService;*/
    
    @RelatedToVia(type = RelationshipTypes.CONNECTS_TO_PORT, direction = Direction.OUTGOING, elementClass = ConnectsToPort.class)
    private Set<ConnectsToPort> connectedPorts = new HashSet<ConnectsToPort>();
    
    public void connectsToPort(Port destPort, String linkCapacity, String availableBandwidth, String latency) {
    	//ConnectsToPort connectsToPort = new ConnectsToPort(this, destPort);
    	
    	for (ConnectsToPort connection : connectedPorts) {
    		System.out.println("CONNECTEDPORTS=========");
    		System.out.println(connection.getSourcePort().getPortName());
    		System.out.println(connection.getDestPort().getPortName());
    		System.out.println(connection.getAvailableBandwidth());
    		System.out.println(connection.getLatency());
    		System.out.println(connection.getLinkCapacity());
    		
    		if(connection.getDestPort().getPortName().equals(destPort.getPortName())) {
    			System.out.println("FOUND Connection : "+connection.getAvailableBandwidth());
    			this.connectedPorts.remove(connection);
    			System.out.println("ConnectedPorts HasSet Size After Removal : "+connectedPorts.size());
    		} else {
    			System.out.println("Connection NOT Found!");
    		}
    	}

    	ConnectsToPort connectsToPort = new ConnectsToPort(this, destPort, linkCapacity, availableBandwidth, latency);
    	this.connectedPorts.add(connectsToPort);
    	System.out.println("Connected Ports HashSet Size : "+connectedPorts.size());
    }
    
    public Set<Port> getAllConnectedPortsFromSourcePort() {
    	Set<Port> connectedPortsFromSourcePort = new HashSet<Port>();
    	for (ConnectsToPort connectedPort : connectedPorts) {
    		connectedPortsFromSourcePort.add(connectedPort.getDestPort());
		}
		return connectedPortsFromSourcePort;
	}
    
    public Port() {
    	
	}
    
    public Port(String portName, String portType) {
    	super();
    	this.portName = portName;
    	this.portType = portType;
    }
    
    public Port(String portName, String portType, String packetsIn, String packetsOut, String bitsIn, String bitsOut) {
		super();
		this.portName = portName;
		this.portType = portType;
		this.packetsIn = packetsIn;
		this.packetsOut = packetsOut;
		this.bitsIn = bitsIn;
		this.bitsOut = bitsOut;
	}
    
    public void setId(Long id) {
		this.id = id;
	}

	public Long getId() {
		return id;
	}
    
    public String getPacketsIn() {
		return packetsIn;
	}
    
    public String getPacketsOut() {
		return packetsOut;
	}
    
    public void setPacketsIn(String packetsIn) {
		this.packetsIn = packetsIn;
	}
    
    public void setPacketsOut(String packetsOut) {
		this.packetsOut = packetsOut;
	}
    
    public void setBitsIn(String bitsIn) {
		this.bitsIn = bitsIn;
	}
    
    public void setBitsOut(String bitsOut) {
		this.bitsOut = bitsOut;
	}
    
    public String getBitsIn() {
		return bitsIn;
	}
    
    public String getBitsOut() {
		return bitsOut;
	} 
 
    public void setPortName(String portName) {
		this.portName = portName;
	}
    
    public String getPortName() {
		return portName;
	}
    
    public void setPortType(String portType) {
		this.portType = portType;
	}
    
    public String getPortType() {
		return portType;
	}
    
    public Set<ConnectsToPort> getConnectedPorts() {
		return connectedPorts;
	}
}
