package com.adaranet.util;

import org.neo4j.graphdb.RelationshipType;

public abstract class RelationshipTypes implements RelationshipType {
	
	public static final String HAS_PORT = "HAS_PORT";
	public static final String CONNECTS_TO_PORT = "CONNECTS_TO_PORT";
	public static final String CONNECTED_TO_DEVICE = "CONNECTED_TO_DEVICE";
}
