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
      '_$_oj':["ForGraph","$a"],
      '_$_pj':["ForLabelOwner","$a"],
      '_$_qj':["ForGraphAndSelection","$a"],
      '_$_rj':["WithType","$a"],
      '_$_idc':["key","$Oc"],
      '_$_sjc':["cancel","$re"],
      '_$_knc':["pen","$Tf"],
      '_$_znc':["edge","$bg"],
      '_$_voc':["size","$kg"],
      '_$_ppc':["graph","$ug"],
      '_$_kqc':["owner","$Cg"],
      '_$_ysc':["location","$qh"],
      '_$_wuc':["sourcePoint","$si"],
      '_$_avc':["targetPoint","$wi"],
      '_$_uyc':["redo","$rk"],
      '_$_yyc':["undo","$tk"],
      '_$_gad':["createEdge","$Pk"],
      '_$_mad':["createNode","$Qk"],
      '_$_nfd':["createBend","$Ym"],
      '_$_qgd':["setPosition","$vn"],
      '_$_phd':["addPortAddedListener","$Rn"],
      '_$_whd':["getNodeLayout","$Vn"],
      '_$_eid':["addLabelAddedListener","$co"],
      '_$_uid':["initializeDrag","$po"],
      '_$_ejd':["addEdgeCreatedListener","$yo"],
      '_$_qjd':["addNodeCreatedListener","$Ho"],
      '_$_ald':["removePortAddedListener","$mp"],
      '_$_zld':["removeLabelAddedListener","$Gp"],
      '_$_and':["removeEdgeCreatedListener","$eq"],
      '_$_mnd':["removeNodeCreatedListener","$nq"],
      '_$_iqd':["getTargetPortCandidates","$Dr"],
      '_$_gsd':["cut","$As"],
      '_$_jsd':["copy","$Cs"],
      '_$_ftd':["getPort","$Ss"],
      '_$_wtd':["addLabel","$dt"],
      '_$_vud':["editLabel","$wt"],
      '_$_avd':["getHandle","$yt"],
      '_$_rvd':["cancelDrag","$Lt"],
      '_$_bwd':["createLabel","$St"],
      '_$_pwd':["setBendLocation","$au"],
      '_$_zwd':["setLabelText","$iu"],
      '_$_byd':["getPreferredSize","$Du"],
      '_$_hzd':["setLabelModelParameter","$lv"],
      '_$_cae':["paste","$Cv"],
      '_$_nae':["setPorts","$Mv"],
      '_$_vae':["canBeMoved","$Tv"],
      '_$_ibe':["dragFinished","$ew"],
      '_$_ice':["getSegmentOrientation","$Aw"],
      '_$_jde':["collectSnapResults","$Zw"],
      '_$_bee':["snapToGrid","$ox"],
      '_$_fee':["createDummyEdge","$rx"],
      '_$_ofe':["getGraph","$Vx"],
      '_$_mge':["getSourceNode","$uy"],
      '_$_oge':["getTargetNode","$vy"],
      '_$_pqe':["port","$TC"],
      '_$_ere':["label","$eD"],
      '_$_oue':["newText","$CE"],
      '_$_ive':["visuals","$VE"],
      '_$_hye':["dragPoint","$zG"],
      '_$_iye':["dummyEdge","$AG"],
      '_$_lye':["edgeStyle","$DG"],
      '_$_lze':["movePorts","$dH"],
      '_$_kaf':["sourceEnd","$AH"],
      '_$_oaf':["useFinder","$FH"],
      '_$_vcf':["startPoint","$SI"],
      '_$_jdf':["armedCursor","$hJ"],
      '_$_zdf':["doubleClick","$yJ"],
      '_$_kff':["nodeCreator","$eK"],
      '_$_wff':["snapContext","$nK"],
      '_$_jhf':["graphControl","$YK"],
      '_$_aif':["nodeComparer","$sL"],
      '_$_nif':["snapDistance","$FL"],
      '_$_bkf':["isInitialized","$EM"],
      '_$_qlf':["showDummyEdge","$sN"],
      '_$_anf':["endHitTestable","$hO"],
      '_$_hnf':["graphSelection","$qO"],
      '_$_tnf':["isInitializing","$BO"],
      '_$_fpf':["validEndCursor","$nP"],
      '_$_jpf':["addExistingPort","$sP"],
      '_$_srf':["showNodePreview","$CQ"],
      '_$_urf':["snappingEnabled","$EQ"],
      '_$_esf':["validBendCursor","$RQ"],
      '_$_lsf':["beginHitTestable","$ZQ"],
      '_$_msf':["cancelRecognizer","$aR"],
      '_$_btf':["edgesHitTestable","$qR"],
      '_$_etf':["finishRecognizer","$tR"],
      '_$_otf':["inputModeContext","$DR"],
      '_$_xtf':["nodesHitTestable","$OR"],
      '_$_vuf':["validBeginCursor","$nS"],
      '_$_rvf':["draggedRecognizer","$OS"],
      '_$_yvf':["hitTestEnumerator","$WS"],
      '_$_wwf':["portOwnerComparer","$uT"],
      '_$_ywf':["prepareRecognizer","$wT"],
      '_$_axf':["pressedRecognizer","$xT"],
      '_$_aag':["releasedRecognizer","$RU"],
      '_$_gag':["reparentRecognizer","$WU"],
      '_$_iag':["returnExistingBend","$YU"],
      '_$_sag':["showPortCandidates","$eV"],
      '_$_fbg':["bendCreationAllowed","$sV"],
      '_$_gbg':["candidateDescriptor","$tV"],
      '_$_zbg':["maximumSnapDistance","$RV"],
      '_$_ucg':["reparentNodeHandler","$nW"],
      '_$_bdg':["sourcePortCandidate","$uW"],
      '_$_edg':["targetPortCandidate","$zW"],
      '_$_feg':["createBendRecognizer","$cX"],
      '_$_meg':["forceSnapToCandidate","$nX"],
      '_$_seg':["inputModeCanvasGroup","$tX"],
      '_$_ueg':["isCreationInProgress","$uX"],
      '_$_veg':["isGroupNodePredicate","$vX"],
      '_$_hfg':["movedRecognizerTouch","$HX"],
      '_$_ifg':["nodeBasedEdgeCreator","$IX"],
      '_$_jfg':["nodeBorderWidthRatio","$JX"],
      '_$_qfg':["portBasedEdgeCreator","$QX"],
      '_$_ufg':["removeBendRecognizer","$VX"],
      '_$_fgg':["snappedMousePosition","$hY"],
      '_$_hgg':["validBendHitTestable","$jY"],
      '_$_ngg':["cancelRecognizerTouch","$sY"],
      '_$_vgg':["finishRecognizerTouch","$CY"],
      '_$_lhg':["orthogonalEdgeEditing","$TY"],
      '_$_shg':["resolvePortCandidates","$bZ"],
      '_$_vhg':["snapToTargetCandidate","$fZ"],
      '_$_kig':["draggedRecognizerTouch","$zZ"],
      '_$_cjg':["orthogonalEdgeCreation","$SZ"],
      '_$_djg':["orthogonalSnapDistance","$TZ"],
      '_$_gjg':["prepareRecognizerTouch","$WZ"],
      '_$_ojg':["splitOrthogonalSegment","$eab"],
      '_$_vjg':["connectToCandidatesOnly","$oab"],
      '_$_lkg':["releasedRecognizerTouch","$Fab"],
      '_$_qkg':["selfloopCreationAllowed","$Kab"],
      '_$_mlg':["enableSnappingRecognizer","$hbb"],
      '_$_ylg':["movedOrDraggedRecognizer","$qbb"],
      '_$_kmg':["createBendRecognizerTouch","$Fbb"],
      '_$_mmg':["disableSnappingRecognizer","$Ibb"],
      '_$_jng':["removeBendRecognizerTouch","$ecb"],
      '_$_tng':["closestCandidateDescriptor","$rcb"],
      '_$_gog':["snapToTargetCandidateOwner","$Ecb"],
      '_$_hog':["unselectedEdgesHitTestable","$Fcb"],
      '_$_iog':["unselectedNodesHitTestable","$Gcb"],
      '_$_xog':["resolveSourcePortCandidates","$Wcb"],
      '_$_yog':["resolveTargetPortCandidates","$Xcb"],
      '_$_cpg':["edgeToEdgeConnectionsAllowed","$ddb"],
      '_$_hpg':["orthogonalEdgeEditingContext","$jdb"],
      '_$_ipg':["preferredMinimalEdgeDistance","$kdb"],
      '_$_lpg':["useLabelModelParameterFinder","$ndb"],
      '_$_mpg':["cyclicPortDependenciesAllowed","$odb"],
      '_$_ppg':["enforceBendCreationRecognizer","$rdb"],
      '_$_kqg':["showHitPortOwnerCandidatesOnly","$Pdb"],
      '_$_lqg':["useHitNodeTargetCandidatesOnly","$Qdb"],
      '_$_drg':["splitOrthogonalSegmentRecognizer","$jeb"],
      '_$_frg':["portCandidateResolutionRecognizer","$leb"],
      '_$_krg':["toggleSegmentOrientationRecognizer","$qeb"],
      '_$_tsg':["cleanUp","$Reb"],
      '_$_vtg':["selectAll","$qfb"],
      '_$_jwg':["groupSelection","$Bgb"],
      '_$_pwg':["deleteSelection","$Hgb"],
      '_$_rwg':["dragInitialized","$Jgb"],
      '_$_dxg':["ungroupSelection","$Xgb"],
      '_$_gxg':["adjustContentRect","$Zgb"],
      '_$_xxg':["adjustGroupNodeSizes","$thb"],
      '_$_lah':["lineTo","$Nib"],
      '_$_jbh':["getEdge","$hjb"],
      '_$_ach':["dragBend","$yjb"],
      '_$_jch':["getNodes","$Fjb"],
      '_$_xch':["addMovedListener","$Tjb"],
      '_$_eeh':["addMovingListener","$ykb"],
      '_$_kgh':["addDraggedListener","$xlb"],
      '_$_nih':["addDraggingListener","$tmb"],
      '_$_yih':["addMovedPort","$Dmb"],
      '_$_gkh':["removeMovedListener","$jnb"],
      '_$_rkh':["addCleanedUpListener","$qnb"],
      '_$_jmh':["removeMovingListener","$fob"],
      '_$_onh':["removeDraggedListener","$Mob"],
      '_$_vnh':["setCurrentItem","$Rob"],
      '_$_wnh':["addBendCreatedListener","$Sob"],
      '_$_ynh':["addDeletedItemListener","$Tob"],
      '_$_eoh':["addInitializedListener","$Yob"],
      '_$_goh':["addItemClickedListener","$Zob"],
      '_$_ooh':["addMovedEdgeEnd","$gpb"],
      '_$_uph':["removeDraggingListener","$Epb"],
      '_$_hqh':["addDragCanceledListener","$Ppb"],
      '_$_qqh':["addInitializingListener","$Wpb"],
      '_$_frh':["closeLabelEditor","$kqb"],
      '_$_lrh':["disarmValidBegin","$qqb"],
      '_$_trh':["getMovementInfos","$wqb"],
      '_$_xrh':["lockPortMovement","$Aqb"],
      '_$_zrh':["removeCleanedUpListener","$Cqb"],
      '_$_vth':["addGestureStartedListener","$trb"],
      '_$_cuh':["addNodeReparentedListener","$Arb"],
      '_$_vuh':["removeBendCreatedListener","$Urb"],
      '_$_xuh':["removeDeletedItemListener","$Vrb"],
      '_$_dvh':["removeInitializedListener","$asb"],
      '_$_gvh':["removeItemClickedListener","$bsb"],
      '_$_qvh':["addGestureCanceledListener","$lsb"],
      '_$_rvh':["addGestureFinishedListener","$msb"],
      '_$_svh':["addGestureStartingListener","$nsb"],
      '_$_bwh':["doStartEdgeCreation","$wsb"],
      '_$_hwh':["removeDragCanceledListener","$Asb"],
      '_$_rwh':["removeInitializingListener","$Hsb"],
      '_$_cxh':["addDeletedSelectionListener","$Ssb"],
      '_$_exh':["addGestureCancelingListener","$Tsb"],
      '_$_fxh':["addGestureFinishingListener","$Usb"],
      '_$_ixh':["addLabelTextChangedListener","$Wsb"],
      '_$_kxh':["addQueryItemToolTipListener","$Xsb"],
      '_$_lyh':["addDeletingSelectionListener","$wtb"],
      '_$_pyh':["addItemDoubleClickedListener","$ytb"],
      '_$_uyh':["addValidateLabelTextListener","$Ctb"],
      '_$_ezh':["removeGestureStartedListener","$Mtb"],
      '_$_lzh':["removeNodeReparentedListener","$Ttb"],
      '_$_aai':["addExplicitlyMovedBend","$iub"],
      '_$_bai':["addImplicitlyMovedBend","$jub"],
      '_$_nai':["removeGestureCanceledListener","$vub"],
      '_$_oai':["removeGestureFinishedListener","$wub"],
      '_$_pai':["removeGestureStartingListener","$xub"],
      '_$_xai':["addEdgeCreationStartedListener","$Fub"],
      '_$_ebi':["addTransformedPortOwner","$Mub"],
      '_$_fbi':["adjustToSizeConstraints","$Nub"],
      '_$_jbi':["removeDeletedSelectionListener","$Rub"],
      '_$_lbi':["removeGestureCancelingListener","$Sub"],
      '_$_mbi':["removeGestureFinishingListener","$Tub"],
      '_$_pbi':["removeLabelTextChangedListener","$Vub"],
      '_$_qbi':["removeQueryItemToolTipListener","$Wub"],
      '_$_bci':["removeDeletingSelectionListener","$fvb"],
      '_$_eci':["removeItemDoubleClickedListener","$hvb"],
      '_$_ici':["removeValidateLabelTextListener","$lvb"],
      '_$_idi':["removeEdgeCreationStartedListener","$Kvb"],
      '_$_mdi':["selectNodeAndSelfloopBends","$Ovb"],
      '_$_odi':["addPopulateItemContextMenuListener","$Qvb"],
      '_$_tei':["removePopulateItemContextMenuListener","$uwb"],
      '_$_mhi':["findItem","$Jxb"],
      '_$_nki':["updateValues","$lzb"],
      '_$_eli':["setNodeBounds","$Bzb"],
      '_$_woi':["isOrthogonallyEditedEdge","$wBb"],
      '_$_aqi':["findItemFiltered","$aCb"],
      '_$_cqi':["findItems","$cCb"],
      '_$_ori':["createImplicitlyMovedBendInfo","$RCb"],
      '_$_yri':["findItemFilteredWithContext","$bDb"],
      '_$_bsi':["findItemsWithContext","$eDb"],
      '_$_tti':["lineFrom","$WDb"],
      '_$_uti':["addedBends","$XDb"],
      '_$_wti':["innerLine1To","$ZDb"],
      '_$_xti':["innerLine2To","$aEb"],
      '_$_yti':["outerLine1To","$bEb"],
      '_$_zti':["outerLine2To","$cEb"],
      '_$_aui':["sourceLineTo","$dEb"],
      '_$_bui':["targetLineTo","$eEb"],
      '_$_eui':["innerLine1From","$hEb"],
      '_$_fui':["innerLine2From","$iEb"],
      '_$_gui':["outerLine1From","$jEb"],
      '_$_hui':["outerLine2From","$kEb"],
      '_$_jui':["sourceLineFrom","$mEb"],
      '_$_kui':["targetLineFrom","$nEb"],
      '_$_oui':["highlightedNode","$rEb"],
      '_$_pui':["lockedPortEdges","$sEb"],
      '_$_qui':["distanceIndicatorTo","$tEb"],
      '_$_uui':["distanceIndicator1To","$xEb"],
      '_$_vui':["distanceIndicator2To","$yEb"],
      '_$_xui':["distanceIndicatorFrom","$AEb"],
      '_$_yui':["transformedPortOwners","$BEb"],
      '_$_zui':["distanceIndicator1From","$CEb"],
      '_$_avi':["distanceIndicator2From","$DEb"],
      '_$_hvi':["currentInputModeContext","$JEb"],
      '_$_kvi':["graphInputModeController","$MEb"],
      '_$_xvi':["getPen","$YEb"],
      '_$_wwi':["onAddLabel","$yFb"],
      '_$_fxi':["onEditLabel","$HFb"],
      '_$_oxi':["createVisuals","$RFb"],
      '_$_rxi':["getPortOwners","$UFb"],
      '_$_yxi':["getDraggedNode","$cGb"],
      '_$_hyi':["removeLastBend","$nGb"],
      '_$_kyi':["createDragPoint","$qGb"],
      '_$_xyi':["startCreateEdge","$DGb"],
      '_$_hzi':["createStartPoint","$KGb"],
      '_$_faj':["determineEdgeStyle","$iHb"],
      '_$_jaj':["clearDummyEdgeBends","$mHb"],
      '_$_jbj':["createDummyTargetNode","$LHb"],
      '_$_tbj':["createEdgesHitTestable","$XHb"],
      '_$_vbj':["createInputModeContext","$ZHb"],
      '_$_xbj':["createLabelHitTestable","$aIb"],
      '_$_acj':["createNodesHitTestable","$dIb"],
      '_$_dcj':["isBendCreationEnforced","$gIb"],
      '_$_mcj':["createNodeDropInputMode","$oIb"],
      '_$_zcj':["createMoveLabelInputMode","$BIb"],
      '_$_gdj':["getChildInputModeContext","$IIb"],
      '_$_kdj':["createCreateBendInputMode","$MIb"],
      '_$_ldj':["createCreateEdgeInputMode","$NIb"],
      '_$_rdj':["createNavigationInputMode","$TIb"],
      '_$_sdj':["createReparentNodeHandler","$UIb"],
      '_$_wdj':["createTextEditorInputMode","$XIb"],
      '_$_afj':["createPortCandidateDescriptor","$AJb"],
      '_$_lfj':["createUnselectedEdgesHitTestable","$LJb"],
      '_$_mfj':["createUnselectedNodesHitTestable","$MJb"],
      '_$_nfj':["isPortCandidateResolutionEnabled","$NJb"],
      '_$_ofj':["createEdgeCreationInputModeContext","$OJb"],
      '_$_cgj':["cancelWithTransition","$cKb"],
      '_$_ogj':["getNode","$oKb"],
      '_$_sgj':["onMoved","$sKb"],
      '_$_xgj':["onMoving","$vKb"],
      '_$_bhj':["setGraphCore","$zKb"],
      '_$_lhj':["onDragged","$IKb"],
      '_$_vhj':["createBendWithTransition","$SKb"],
      '_$_cij':["onDragging","$XKb"],
      '_$_hij':["dragSegmentWithTransition","$cLb"],
      '_$_iij':["getMoveType","$dLb"],
      '_$_nij':["onCleanedUp","$iLb"],
      '_$_vij':["onPortAdded","$oLb"],
      '_$_fjj':["getPortOwner","$yLb"],
      '_$_jjj':["onLabelAdded","$zLb"],
      '_$_rjj':["setDragPoint","$HLb"],
      '_$_tjj':["armValidBegin","$JLb"],
      '_$_xjj':["getLabelStyle","$NLb"],
      '_$_dkj':["onBendCreated","$TLb"],
      '_$_gkj':["onDeletedItem","$VLb"],
      '_$_okj':["onEdgeCreated","$bMb"],
      '_$_skj':["onInitialized","$eMb"],
      '_$_wkj':["onItemClicked","$gMb"],
      '_$_blj':["onNodeCreated","$jMb"],
      '_$_mlj':["createNewLabel","$uMb"],
      '_$_emj':["onDragCanceled","$KMb"],
      '_$_mmj':["onInitializing","$QMb"],
      '_$_fnj':["assignEdgeStyle","$eNb"],
      '_$_goj':["setGraphControl","$CNb"],
      '_$_joj':["shouldBeClicked","$ENb"],
      '_$_loj':["shouldBeDeleted","$FNb"],
      '_$_ooj':["addDummyEdgeBend","$INb"],
      '_$_soj':["cleanupEdgePaths","$MNb"],
      '_$_cpj':["onGestureStarted","$XNb"],
      '_$_opj':["onNodeReparented","$hOb"],
      '_$_rpj':["prepareEdgePaths","$kOb"],
      '_$_bqj':["getLabelParameter","$vOb"],
      '_$_fqj':["getPortCandidates","$yOb"],
      '_$_oqj':["onGestureCanceled","$HOb"],
      '_$_pqj':["onGestureFinished","$IOb"],
      '_$_qqj':["onGestureStarting","$JOb"],
      '_$_xqj':["registerAddedBend","$OOb"],
      '_$_zqj':["setGraphSelectionCore","$QOb"],
      '_$_arj':["setGraphSelection","$ROb"],
      '_$_mrj':["getSourcePortOwner","$ePb"],
      '_$_nrj':["getTargetPortOwner","$fPb"],
      '_$_rrj':["onDeletedSelection","$jPb"],
      '_$_trj':["onGestureCanceling","$kPb"],
      '_$_urj':["onGestureFinishing","$lPb"],
      '_$_xrj':["onLabelTextChanged","$nPb"],
      '_$_zrj':["onQueryItemToolTip","$pPb"],
      '_$_gsj':["shouldQueryToolTip","$uPb"],
      '_$_hsj':["useParameterFinder","$vPb"],
      '_$_isj':["adjustGroupNodeSize","$wPb"],
      '_$_ctj':["onDeletingSelection","$PPb"],
      '_$_ftj':["onItemDoubleClicked","$RPb"],
      '_$_ktj':["onValidateLabelText","$VPb"],
      '_$_mtj':["setClosestCandidate","$XPb"],
      '_$_ptj':["shouldLabelBeEdited","$aQb"],
      '_$_puj':["shouldInstallCommand","$yQb"],
      '_$_cvj':["onEdgeCreationStarted","$LQb"],
      '_$_hvj':["shouldBeClickSelected","$QQb"],
      '_$_ivj':["shouldBeDoubleClicked","$RQb"],
      '_$_svj':["shouldSetToCurrentItem","$aRb"],
      '_$_zvj':["getDropTargetParentNode","$hRb"],
      '_$_bwj':["getOrthogonalEdgeHelper","$jRb"],
      '_$_gwj':["onTargetLocationChanged","$oRb"],
      '_$_nwj':["getFirstSegmentDirection","$vRb"],
      '_$_zwj':["onPopulateItemContextMenu","$HRb"],
      '_$_dxj':["shouldPopulateContextMenu","$JRb"],
      '_$_kxj':["createExistingPortCandidate","$QRb"],
      '_$_mxj':["createDummyEdgeVisualCreator","$SRb"],
      '_$_sxj':["getSourcePortCandidateProvider","$YRb"],
      '_$_ayj':["click","$gSb"],
      '_$_dyj':["collect","$jSb"],
      '_$_pyj':["isValidEnd","$vSb"],
      '_$_tyj':["dragSegment","$zSb"],
      '_$_uyj':["getDistance","$ASb"],
      '_$_xyj':["isValidBend","$DSb"],
      '_$_dzj':["isValidBegin","$JSb"],
      '_$_nzj':["canRemoveBend","$SSb"],
      '_$_aak':["configureDummy","$fTb"],
      '_$_gak':["onGraphChanged","$lTb"],
      '_$_oak':["cleanUpEdgePath","$tTb"],
      '_$_uak':["isCancelGesture","$zTb"],
      '_$_wak':["isValidLabelHit","$BTb"],
      '_$_dbk':["setBendLocationForBend","$ITb"],
      '_$_nbk':["hideOriginalEdge","$RTb"],
      '_$_tbk':["removeAddedBends","$XTb"],
      '_$_hck':["isRemoveBendEvent","$lUb"],
      '_$_lck':["onLabelTextEdited","$oUb"],
      '_$_mck':["resolveCandidates","$pUb"],
      '_$_edk':["unhideOriginalEdge","$GUb"],
      '_$_jdk':["getClosestCandidate","$MUb"],
      '_$_bek':["getDummyEdgeSnapLines","$eVb"],
      '_$_eek':["onGraphControlChanged","$hVb"],
      '_$_kek':["updateTargetPortOwner","$nVb"],
      '_$_pek':["getParameterCandidates","$sVb"],
      '_$_ffk':["onGraphSelectionChanged","$GVb"],
      '_$_mfk':["assignSourcePortPosition","$NVb"],
      '_$_ufk':["createCandidateDescriptor","$VVb"],
      '_$_yfk':["getClosestSourceCandidate","$ZVb"],
      '_$_zfk':["getClosestTargetCandidate","$aWb"],
      '_$_ggk':["createLabelPositionHandler","$hWb"],
      '_$_jgk':["handleActionButtonProvider","$jWb"],
      '_$_ogk':["onNodeDropInputModeChanged","$nWb"],
      '_$_tgk':["onMoveLabelInputModeChanged","$sWb"],
      '_$_vgk':["isSourceNodeDraggingFinished","$uWb"],
      '_$_wgk':["onCreateBendInputModeChanged","$vWb"],
      '_$_xgk':["onCreateEdgeInputModeChanged","$wWb"],
      '_$_zgk':["onNavigationInputModeChanged","$yWb"],
      '_$_ahk':["onReparentNodeHandlerChanged","$zWb"],
      '_$_chk':["onTextEditorInputModeChanged","$BWb"],
      '_$_rhk':["getTargetPortCandidateProviderForLocation","$OWb"],
      '_$_uhk':["onNodeDropInputModeNodeCreated","$RWb"],
      '_$_nik':["onCreateBendInputModeBendCreated","$kXb"],
      '_$_ijk':["createEdgeBetweenNodes","$FXb"],
      '_$_jjk':["createEdgeForCandidates","$GXb"],
      '_$_ojk':["assignBends","$LXb"],
      '_$_vjk':["setParameter","$SXb"],
      '_$_hkk':["getNewParameter","$eYb"],
      '_$_rkk':["resolveCandidate","$oYb"],
      '_$_dlk':["setToPortCandidate","$AYb"],
      '_$_tlk':["getSourcePortCandidate","$PYb"],
      '_$_ylk':["createPortRelocationHandle","$UYb"],
      '_$_bmk':["getTargetPortCandidateProvider","$XYb"],
      '_$_pmk':["getSnapLines","$kZb"],
      '_$_tmk':["addPortSnapLines","$oZb"],
      '_$_umk':["addGridSnapResult","$pZb"],
      '_$_xmk':["addCenterSnapLines","$sZb"],
      '_$_ymk':["collectSnapResultsForSnapLine","$tZb"],
      '_$_ink':["createCenterSnapLine","$DZb"],
      '_$_lnk':["prepareOrthogonalEdge","$GZb"],
      '_$_mnk':["addNodeToNodeSnapLines","$HZb"],
      '_$_onk':["collectGridSnapResults","$JZb"],
      '_$_tnk':["addNodeToSegmentSnapLines","$OZb"],
      '_$_znk':["collectSnapLineSnapResults","$UZb"],
      '_$_aok':["addFixedNodeBorderSnapLines","$VZb"],
      '_$_bok':["createDefaultLabelConfiguration","$WZb"],
      '_$_dok':["setPort","$YZb"],
      '_$_pok':["collectSnapLineResults","$kac"],
      '_$_tok':["collectSameSizeSnapResults","$oac"],
      '_$_uok':["addVerticalSegmentSnapLines","$pac"],
      '_$_vok':["addHorizontalSegmentSnapLines","$qac"],
      '_$_xok':["addSnaplineSnapResult","$sac"],
      '_$_cpk':["addGridSnapResultCore","$xac"],
      '_$_dpk':["addSameSizeSnapResult","$yac"],
      '_$_fpk':["addGridLineSnapResult","$Aac"],
      '_$_bbl':["CreateBendInputMode","KTB"],
      '_$_cbl':["EdgeDragInputModeBase","LTB"],
      '_$_dbl':["EditLabelHelper","MTB"],
      '_$_ebl':["NodeBasedEdgeCreationCallback","NTB"],
      '_$_fbl':["PortBasedEdgeCreationCallback","OTB"],
      '_$_gbl':["CreateEdgeInputMode","PTB"],
      '_$_hbl':["EdgeSegmentDirection","QTB"],
      '_$_ibl':["NodeCreationCallback","RTB"],
      '_$_jbl':["AdjustContentRectPolicy","STB"],
      '_$_kbl':["GraphInputModeController","UTB"],
      '_$_lbl':["LabelTextValidatingEventArgs","WTB"],
      '_$_mbl':["MoveLabelInputMode","XTB"],
      '_$_nbl':["NodeDropInputMode","YTB"],
      '_$_obl':["NodeDropCreationCallback","ZTB"],
      '_$_pbl':["OrthogonalEdgeEditingContext","AUB"],
      '_$_qbl':["OrthogonalEdgeHelper","BUB"],
      '_$_rbl':["PortLocationModelParameterHandle","CUB"],
      '_$_sbl':["ReparentNodeHandler","DUB"],
      '_$_tbl':["NodeSnapLineProvider","EUB"],
      '_$_ubl':["EdgeSnapLineProvider","FUB"],
      '_$_vbl':["SnapLineVisual","GUB"],
      '_$_wbl':["SingleLineSnapLineVisual","HUB"],
      '_$_xbl':["FixedDistanceSnapLineVisual","IUB"],
      '_$_ybl':["InBetweenSnapLineVisual","JUB"],
      '_$_zbl':["NodeSnapResultProvider","KUB"],
      '_$_acl':["NodeReshapeSnapResultProvider","LUB"],
      '_$_bcl':["DefaultBendCreator","MUB"],
      '_$_ccl':["EdgeEndMoveHandle","NUB"],
      '_$_dcl':["PortRelocationHandle","OUB"],
      '_$_ecl':["PortRelocationHandleProvider","PUB"],
      '_$_fcl':["PortsHandleProvider","QUB"],
      '_$$_mnb':["pasteDelta","$FI"],
      '_$$_fob':["movableItems","$rL"],
      '_$$_gob':["pasteAllowed","$vL"],
      '_$$_oob':["toolTipItems","$NL"],
      '_$$_epb':["clickableItems","$LN"],
      '_$$_jpb':["deletableItems","$YN"],
      '_$$_kpb':["focusableItems","$lO"],
      '_$$_ypb':["selectableItems","$yQ"],
      '_$$_bqb':["showHandleItems","$BQ"],
      '_$$_lqb':["contextMenuItems","$kR"],
      '_$$_vqb':["candidateTemplate","$xS"],
      '_$$_wqb':["clickHitTestOrder","$BS"],
      '_$$_drb':["highlightTemplate","$VS"],
      '_$$_grb':["nodeDropInputMode","$kT"],
      '_$$_lrb':["contentRectMargins","$cU"],
      '_$$_prb':["labelAddingAllowed","$wU"],
      '_$$_rrb':["labelEditableItems","$xU"],
      '_$$_srb':["moveLabelInputMode","$CU"],
      '_$$_wrb':["bendCreationAllowed","$sV"],
      '_$$_xrb':["createBendInputMode","$zV"],
      '_$$_yrb':["createEdgeInputMode","$AV"],
      '_$$_asb':["edgeCreationAllowed","$GV"],
      '_$$_dsb':["labelEditingAllowed","$PV"],
      '_$$_fsb':["navigationInputMode","$WV"],
      '_$$_gsb':["nodeCreationAllowed","$XV"],
      '_$$_msb':["textEditorInputMode","$AW"],
      '_$$_nsb':["clickSelectableItems","$VW"],
      '_$$_ysb':["reparentNodesAllowed","$YX"],
      '_$$_ctb':["autoRemoveEmptyLabels","$rY"],
      '_$$_dtb':["clearSelectionAllowed","$uY"],
      '_$$_gtb':["groupSelectionAllowed","$HY"],
      '_$$_ltb':["undoOperationsAllowed","$hZ"],
      '_$$_otb':["createBendModePriority","$sZ"],
      '_$$_ptb':["createEdgeModePriority","$tZ"],
      '_$$_utb':["marqueeSelectableItems","$LZ"],
      '_$$_xtb':["navigationModePriority","$PZ"],
      '_$$_aub':["adjustContentRectPolicy","$iab"],
      '_$$_bub':["autoSelectSelfloopBends","$jab"],
      '_$$_hub':["ungroupSelectionAllowed","$Sab"],
      '_$$_jub':["multiSelectionRecognizer","$sbb"],
      '_$$_mub':["detailSelectionRecognizer","$Hbb"],
      '_$$_pub':["nodeDropInputModePriority","$Zbb"],
      '_$$_rub':["useCurrentItemForCommands","$mcb"],
      '_$$_tub':["adjustGroupNodeSizeAllowed","$ocb"],
      '_$$_uub':["clipboardOperationsAllowed","$qcb"],
      '_$$_wub':["textEditorInputModePriority","$adb"],
      '_$$_adc':["yfiles.input","Root"],
      '_$$_bdc':["GraphEditorInputMode","TTB"],
      '_$$_cdc':["LabelPositionHandler","VTB"],
      '_$$_ddc':["yfiles.drawing","Root"]
    },yfiles.mappings);
  }
  return undefined;
});