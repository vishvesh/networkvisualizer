/****************************************************************************
 **
 ** This file is part of yFiles for HTML 1.1.0.1.
 ** 
 ** yWorks proprietary/confidential. Use is subject to license terms.
 **
 ** Copyright (c) 2013 by yWorks GmbH, Vor dem Kreuzberg 28, 
 ** 72070 Tuebingen, Germany. All rights reserved.
 **
 ***************************************************************************/
(typeof define=='function'?define:(function(dependencies, fn){fn();}))(['yfiles/lang'],function(){
  {
    if(!yfiles.mappings)yfiles.mappings={};
    yfiles.lang.copyOwnTo({
      '_$_mtb':["FromLineSegment","$a"],
      '_$_ntb':["FromCellEntrance","$a"],
      '_$_otb':["WithCoreLayouter","$a"],
      '_$_ptb':["IListener","$a"],
      '_$_qtb':["calculateUnion","$a"],
      '_$_rtb':["calculateUnionWithIntervalAndInterval","$b"],
      '_$_stb':["calculateBridge","$c"],
      '_$_ttb':["calculateIntersection","$d"],
      '_$_utb':["calculateSpanningRectangle","$e"],
      '_$_vtb':["FromCoordinates","$a"],
      '_$_wtb':["calculateUnion","$b"],
      '_$_xtb':["valueOfExitDirection","$a"],
      '_$_ytb':["valueOfPortCandidate","$b"],
      '_$_ztb':["valueOfEnterDirection","$c"],
      '_$_aub':["valueOfPortConstraint","$d"],
      '_$_bub':["PartitionCellBorder","$a"],
      '_$_cub':["FromRectangle","$b"],
      '_$_dub':["WithCompleteSpecification","$a"],
      '_$_rec':["clear","$bd"],
      '_$_ngc':["contains","$sd"],
      '_$_pjc':["type","$qe"],
      '_$_cnc':["id","$Pf"],
      '_$_inc':["min","$Sf"],
      '_$_ync':["edge","$bg"],
      '_$_uoc':["size","$kg"],
      '_$_hpc':["edges","$rg"],
      '_$_rpc':["graph","$ug"],
      '_$_drc':["width","$Kg"],
      '_$_erc':["bounds","$Lg"],
      '_$_orc':["height","$Og"],
      '_$_wrc':["length","$Sg"],
      '_$_usc':["location","$qh"],
      '_$_lzc':["cleanup","$Bk"],
      '_$_mzc':["getPath","$Ck"],
      '_$_uad':["initialize","$Vk"],
      '_$_rdd':["getData","$km"],
      '_$_jed':["getCells","$Am"],
      '_$_ked':["getCellsWithObstacle","$Bm"],
      '_$_hgd':["getEdgeInfo","$on"],
      '_$_wgd':["getNeighbors","$An"],
      '_$_xgd':["getObstacles","$Bn"],
      '_$_xhd':["onCellCreated","$Wn"],
      '_$_fkd':["onCellFinalized","$Vo"],
      '_$_urd':["addDynamicDecompositionListener","$ns"],
      '_$_bsd':["removeDynamicDecompositionListener","$ws"],
      '_$_lsd':["init","$Ds"],
      '_$_dyd':["onCellSubdivided","$Gu"],
      '_$_fyd':["preparePartition","$Iu"],
      '_$_mee':["appendEnterIntervals","$yx"],
      '_$_wje':["distanceTo","$Mz"],
      '_$_kpe':["max","$AC"],
      '_$_npe':["cell","$EC"],
      '_$_ope':["cost","$FC"],
      '_$_rpe':["data","$GC"],
      '_$_wpe':["grid","$JC"],
      '_$_ype':["maxX","$MC"],
      '_$_cqe':["maxY","$NC"],
      '_$_hqe':["minX","$QC"],
      '_$_jqe':["minY","$RC"],
      '_$_wqe':["costs","$ZC"],
      '_$_zqe':["fixed","$bD"],
      '_$_ire':["range","$hD"],
      '_$_zre':["center","$uD"],
      '_$_ste':["context","$gE"],
      '_$_rue':["originX","$FE"],
      '_$_tue':["originY","$GE"],
      '_$_ave':["spacing","$OE"],
      '_$_jwe':["grouping","$yF"],
      '_$_uxe':["vertical","$kG"],
      '_$_zxe':["bendCount","$qG"],
      '_$_fye':["direction","$xG"],
      '_$_yze':["partition","$pH"],
      '_$_ebf':["edgeRouter","$VH"],
      '_$_icf':["pathSearch","$GI"],
      '_$_mdf':["bendPenalty","$jJ"],
      '_$_tdf':["currentEdge","$sJ"],
      '_$_ghf':["exitInterval","$WK"],
      '_$_vhf':["maxExtension","$mL"],
      '_$_whf':["minExtension","$nL"],
      '_$_zhf':["mirrorBorder","$qL"],
      '_$_jif':["segmentGroup","$AL"],
      '_$_kif':["segmentIndex","$BL"],
      '_$_lif':["segmentInfos","$CL"],
      '_$_bjf':["configuration","$ZL"],
      '_$_ljf':["edgeCellInfos","$mM"],
      '_$_qjf':["enterInterval","$rM"],
      '_$_sjf':["exitDirection","$tM"],
      '_$_tjf':["exitSegmentNo","$uM"],
      '_$_mkf':["locationRange","$NM"],
      '_$_wlf':["widthInterval","$yN"],
      '_$_bnf':["enterDirection","$iO"],
      '_$_cnf':["enterSegmentNo","$jO"],
      '_$_aof':["lengthInterval","$IO"],
      '_$_cpf':["sphereOfAction","$mP"],
      '_$_zpf':["cutObstacleCost","$JP"],
      '_$_zqf':["maximumDuration","$kQ"],
      '_$_jrf':["penaltySettings","$rQ"],
      '_$_psf':["cellSegmentInfos","$bR"],
      '_$_ctf':["exitSegmentGroup","$rR"],
      '_$_fuf':["pathSearchResult","$VR"],
      '_$_huf':["previousEntrance","$XR"],
      '_$_juf':["reroutingEnabled","$ZR"],
      '_$_ouf':["strongSourcePort","$fS"],
      '_$_puf':["strongTargetPort","$gS"],
      '_$_hvf':["commonSegmentInfo","$ES"],
      '_$_vvf':["enterSegmentGroup","$RS"],
      '_$_byf':["combinedSourceCell","$XT"],
      '_$_cyf':["combinedTargetCell","$YT"],
      '_$_fyf':["considerEdgeLabels","$aU"],
      '_$_myf':["considerNodeLabels","$bU"],
      '_$_uzf':["preferredAlignment","$MU"],
      '_$_mag':["selectedEdgesDpKey","$aV"],
      '_$_pag':["selectedNodesDpKey","$bV"],
      '_$_kbg':["commonLocationRange","$wV"],
      '_$_rbg':["edgeCrossingPenalty","$HV"],
      '_$_gcg':["nodeCrossingPenalty","$YV"],
      '_$_vcg':["restOfComputingTime","$oW"],
      '_$_idg':["unbalancedRatioCost","$EW"],
      '_$_rfg':["portViolationPenalty","$RX"],
      '_$_sfg':["previousEdgeCellInfo","$SX"],
      '_$_big':["atStrongPortConstraint","$mZ"],
      '_$_fjg':["polylineRoutingEnabled","$VZ"],
      '_$_xkg':["unbalancedObstaclesCost","$Rab"],
      '_$_klg':["edgeLabelCrossingPenalty","$fbb"],
      '_$_plg':["groupNodeCrossingPenalty","$jbb"],
      '_$_slg':["minimalLastSegmentLength","$mbb"],
      '_$_wlg':["monotonicPathRestriction","$obb"],
      '_$_xlg':["monotonyViolationPenalty","$pbb"],
      '_$_zlg':["nodeLabelCrossingPenalty","$tbb"],
      '_$_ymg':["minimalEdgeToEdgeDistance","$Tbb"],
      '_$_ang':["minimalFirstSegmentLength","$Ubb"],
      '_$_bng':["minimalNodeCornerDistance","$Vbb"],
      '_$_cng':["minimalNodeToEdgeDistance","$Wbb"],
      '_$_yng':["invalidEdgeGroupingPenalty","$wcb"],
      '_$_nog':["currentEdgeLayoutDescriptor","$Lcb"],
      '_$_oog':["defaultEdgeLayoutDescriptor","$Mcb"],
      '_$_tog':["maximumPolylineSegmentRatio","$Scb"],
      '_$_vpg':["registeredPartitionExtensions","$xdb"],
      '_$_gqg':["preferredPolylineSegmentLength","$Ldb"],
      '_$_hqg':["registeredPathSearchExtensions","$Mdb"],
      '_$_wqg':["bendsInNodeToEdgeDistancePenalty","$ceb"],
      '_$_zqg':["maximumNonOrthogonalSegmentRatio","$feb"],
      '_$_arg':["minimalEdgeToEdgeDistancePenalty","$geb"],
      '_$_brg':["minimalNodeCornerDistancePenalty","$heb"],
      '_$_crg':["minimalNodeToEdgeDistancePenalty","$ieb"],
      '_$_jrg':["partitionGridCellReentrancePenalty","$peb"],
      '_$_prg':["minimalFirstLastSegmentLengthPenalty","$veb"],
      '_$_qrg':["minimalGroupNodeToEdgeDistancePenalty","$web"],
      '_$_gsg':["route","$Ieb"],
      '_$_jtg':["clearData","$gfb"],
      '_$_bug':["createCopy","$ufb"],
      '_$_kvg':["segmentCount","$fgb"],
      '_$_xwg':["sourceCellCount","$Ogb"],
      '_$_ywg':["targetCellCount","$Pgb"],
      '_$_nxg':["segmentGroupCount","$ghb"],
      '_$_txg':["calculatePathPoints","$nhb"],
      '_$_yxg':["cellSegmentInfoCount","$uhb"],
      '_$_hyg':["calculateLineSegments","$Ehb"],
      '_$_dbh':["crosses","$djb"],
      '_$_fch':["getCellsWithNode","$Cjb"],
      '_$_ich':["getNodes","$Fjb"],
      '_$_bdh':["coveredBy","$Xjb"],
      '_$_idh':["findPaths","$ekb"],
      '_$_ieh':["addSegment","$Ckb"],
      '_$_seh':["distanceToWithOther","$Lkb"],
      '_$_zeh':["getClosest","$Qkb"],
      '_$_efh':["getSegment","$Vkb"],
      '_$_ifh':["intersects","$Ykb"],
      '_$_ofh':["isLessThan","$dlb"],
      '_$_yfh':["positionOf","$nlb"],
      '_$_cgh':["removeData","$qlb"],
      '_$_jhh':["getEdgeInfoWithPath","$Rlb"],
      '_$_khh':["getEntrance","$Ulb"],
      '_$_nhh':["getObstacle","$Xlb"],
      '_$_tjh':["hasSameRange","$Wmb"],
      '_$_wjh':["isSourceCell","$Zmb"],
      '_$_xjh':["isTargetCell","$anb"],
      '_$_alh':["addSourceCell","$ynb"],
      '_$_blh':["addTargetCell","$znb"],
      '_$_zlh':["getSourceCell","$Vnb"],
      '_$_amh':["getTargetCell","$Wnb"],
      '_$_emh':["isGreaterThan","$bob"],
      '_$_enh':["getNextSegment","$Cob"],
      '_$_gnh':["getSegmentInfo","$Eob"],
      '_$_qoh':["addSegmentGroup","$ipb"],
      '_$_bph':["getEdgeCellInfo","$spb"],
      '_$_oph':["getSegmentGroup","$Apb"],
      '_$_rrh':["getFinalizedPath","$vqb"],
      '_$_puh':["getCellSegmentInfo","$Nrb"],
      '_$_suh':["getCurrentLocation","$Qrb"],
      '_$_tuh':["getPreviousSegment","$Rrb"],
      '_$_cwh':["manhattanDistanceTo","$xsb"],
      '_$_rxh':["createBorderInterval","$etb"],
      '_$_dai':["addPathSearchExtension","$lub"],
      '_$_cdi':["removePathSearchExtension","$Evb"],
      '_$_kfi':["addAdditionalEnterIntervalCalculator","$Kwb"],
      '_$_mfi':["removeAdditionalEnterIntervalCalculator","$Mwb"],
      '_$_chi':["putData","$zxb"],
      '_$_ghi':["setPath","$Cxb"],
      '_$_rhi':["coveredByWithOtherAndEps","$Nxb"],
      '_$_uii':["intersectsWithOtherAndMinIntersection","$syb"],
      '_$_kji':["setEntrance","$Hyb"],
      '_$_hki':["hasSameRangeWithOtherAndEps","$fzb"],
      '_$_qli':["createObstacle","$Nzb"],
      '_$_tni':["setCurrentLocation","$RAb"],
      '_$_cui':["graphPartition","$fEb"],
      '_$_cxi':["newInstance","$EFb"],
      '_$_gzi':["createPathSearch","$JGb"],
      '_$_tzi':["createPathRouting","$WGb"],
      '_$_nej':["createObstacleDecomposition","$nJb"],
      '_$_ahj':["setEdges","$yKb"],
      '_$_djj':["finalizePath","$wLb"],
      '_$_vjj':["finalizeEdges","$LLb"],
      '_$_onj':["initializeEdges","$nNb"],
      '_$_wpj':["cancelCurrentEdge","$pOb"],
      '_$_msj':["configurePathSearch","$APb"],
      '_$_usj':["finalizeCurrentEdge","$IPb"],
      '_$_vsj':["fireCreateCellEvent","$JPb"],
      '_$_stj':["appendStartEntrances","$cQb"],
      '_$_wtj':["createGraphPartition","$gQb"],
      '_$_muj':["optimizeSegmentOrder","$wQb"],
      '_$_quj':["cleanupGraphPartition","$zQb"],
      '_$_tuj':["fireFinalizeCellEvent","$CQb"],
      '_$_zuj':["initializeCurrentEdge","$IQb"],
      '_$_avj':["isValidTargetEntrance","$JQb"],
      '_$_lvj':["adjustSegmentLocations","$TQb"],
      '_$_uvj':["calculateHeuristicCosts","$cRb"],
      '_$_vvj':["configureGraphPartition","$dRb"],
      '_$_yvj':["findPathsForCurrentEdge","$gRb"],
      '_$_awj':["getEdgeLayoutDescriptor","$iRb"],
      '_$_jwj':["finalizePathSearchResult","$rRb"],
      '_$_rwj':["calculateSegmentLocations","$zRb"],
      '_$_fxj':["calculateStartEntranceCost","$LRb"],
      '_$_ubk':["sortSegmentInfos","$YTb"],
      '_$_gdk':["createConfiguration","$JUb"],
      '_$_idk':["fireSubdividedEvent","$LUb"],
      '_$_uek':["createPathSearchContext","$xVb"],
      '_$_zjk':["handleNeighbor","$WXb"],
      '_$_flk':["getObstacleCutCosts","$CYb"],
      '_$_ulk':["decreasePenaltySettings","$QYb"],
      '_$_zlk':["createSegmentInfoComparator","$VYb"],
      '_$_iok':["calculateCosts","$dac"],
      '_$_ook':["getGeometricCutCosts","$jac"],
      '_$_xfm':["AbstractSegmentInfo","SCD"],
      '_$_yfm':["CellEntrance","TCD"],
      '_$_zfm':["CellSegmentInfo","UCD"],
      '_$_agm':["Channel","VCD"],
      '_$_bgm':["ChannelBasedPathRouting","WCD"],
      '_$_cgm':["DynamicObstacleDecomposition","XCD"],
      '_$_dgm':["EdgeCellInfo","YCD"],
      '_$_egm':["EdgeInfo","ZCD"],
      '_$_fgm':["EdgeLayoutDescriptor","ADD"],
      '_$_ggm':["EdgeRouter","BDD"],
      '_$_hgm':["Alignment","CDD"],
      '_$_igm':["RoutingType","DDD"],
      '_$_jgm':["GraphPartition","EDD"],
      '_$_kgm':["GraphPartitionExtensionAdapter","FDD"],
      '_$_lgm':["Grid","GDD"],
      '_$_mgm':["IDynamicDecomposition","HDD"],
      '_$_ngm':["DynamicDecompositionCompanion","IDD"],
      '_$_ogm':["IEnterIntervalCalculator","JDD"],
      '_$_pgm':["IGraphPartitionExtension","KDD"],
      '_$_qgm':["Interval","LDD"],
      '_$_rgm':["IObstaclePartition","MDD"],
      '_$_sgm':["IPartition","NDD"],
      '_$_tgm':["IPartitionCellKeys","ODD"],
      '_$_ugm':["PartitionCellKeysCompanion","PDD"],
      '_$_vgm':["Obstacle","QDD"],
      '_$_wgm':["OrthogonalInterval","RDD"],
      '_$_xgm':["PartitionCell","SDD"],
      '_$_ygm':["Path","TDD"],
      '_$_zgm':["PathSearch","UDD"],
      '_$_ahm':["PathSearchConfiguration","VDD"],
      '_$_bhm':["PathSearchContext","WDD"],
      '_$_chm':["PathSearchExtension","XDD"],
      '_$_dhm':["PathSearchResult","YDD"],
      '_$_ehm':["PenaltySettings","ZDD"],
      '_$_fhm':["PolylineLayoutStage","AED"],
      '_$_ghm':["SegmentGroup","BED"],
      '_$_hhm':["SegmentInfo","CED"],
      '_$$_ajc':["yfiles.router.polyline","Root"]
    },yfiles.mappings);
  }
  return undefined;
});