package com.adaranet;

import org.neo4j.graphdb.RelationshipType;
import org.springframework.data.neo4j.annotation.RelationshipEntity;

public enum RelationshipTypes implements RelationshipType {
	CONNECTS_TO
}
