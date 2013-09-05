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
      '_$_fid':["addLabelAddedListener","$co"],
      '_$_hld':["addStripeChangedListener","$sp"],
      '_$_jld':["addStripeCreatedListener","$tp"],
      '_$_yld':["removeLabelAddedListener","$Gp"],
      '_$_yod':["removeStripeChangedListener","$Vq"],
      '_$_apd':["removeStripeCreatedListener","$Wq"],
      '_$_wud':["editLabel","$wt"],
      '_$_yvd':["canReparent","$Qt"],
      '_$_cwd':["createLabel","$St"],
      '_$_kae':["reparent","$Kv"],
      '_$_lbe':["isValidParent","$gw"],
      '_$_soe':["findStripes","$dC"],
      '_$_dff':["maxRowLevel","$XJ"],
      '_$_hff':["movedStripe","$bK"],
      '_$_dof':["maxColumnLevel","$LO"],
      '_$_zrf':["stripeSelection","$KQ"],
      '_$_nsf':["cancelRecognizer","$aR"],
      '_$_ptf':["inputModeContext","$DR"],
      '_$_tvf':["draggedRecognizer","$OS"],
      '_$_zwf':["pressedRecognizer","$xT"],
      '_$_exf':["showStripePreview","$BT"],
      '_$_bag':["releasedRecognizer","$RU"],
      '_$_rhg':["reparentStripeHandler","$ZY"],
      '_$_bkg':["ignoreContentRecognizer","$vab"],
      '_$_kng':["resizeNeighborsRecognizer","$fcb"],
      '_$_apg':["stripeDropInputModePriority","$Zcb"],
      '_$_utg':["selectAll","$qfb"],
      '_$_dwg':["clearSelection","$xgb"],
      '_$_owg':["deleteSelection","$Hgb"],
      '_$_lgh':["addDraggedListener","$xlb"],
      '_$_lih':["addDraggingListener","$tmb"],
      '_$_ijh':["deleteStripe","$Mmb"],
      '_$_pnh':["removeDraggedListener","$Mob"],
      '_$_xnh':["addDeletedItemListener","$Tob"],
      '_$_coh':["addDragStartedListener","$Wob"],
      '_$_sph':["removeDraggingListener","$Epb"],
      '_$_gqh':["addDragCanceledListener","$Ppb"],
      '_$_jqh':["addDragFinishedListener","$Qpb"],
      '_$_lqh':["addDragStartingListener","$Rpb"],
      '_$_lsh':["addDragCancelingListener","$Mqb"],
      '_$_nsh':["addDragFinishingListener","$Nqb"],
      '_$_wuh':["removeDeletedItemListener","$Vrb"],
      '_$_bvh':["removeDragStartedListener","$Yrb"],
      '_$_gwh':["removeDragCanceledListener","$Asb"],
      '_$_jwh':["removeDragFinishedListener","$Bsb"],
      '_$_kwh':["removeDragStartingListener","$Csb"],
      '_$_dxh':["addDeletedSelectionListener","$Ssb"],
      '_$_hxh':["addLabelTextChangedListener","$Wsb"],
      '_$_byh':["removeDragCancelingListener","$ntb"],
      '_$_dyh':["removeDragFinishingListener","$otb"],
      '_$_myh':["addDeletingSelectionListener","$wtb"],
      '_$_tyh':["addValidateLabelTextListener","$Ctb"],
      '_$_kbi':["removeDeletedSelectionListener","$Rub"],
      '_$_obi':["removeLabelTextChangedListener","$Vub"],
      '_$_aci':["removeDeletingSelectionListener","$fvb"],
      '_$_jci':["removeValidateLabelTextListener","$lvb"],
      '_$_iji':["insertChild","$Fyb"],
      '_$_hqi':["findStripe","$hCb"],
      '_$_kqi':["insertChildWithOwnerIndexAndSize","$kCb"],
      '_$_esi':["findStripeFiltered","$hDb"],
      '_$_hsi':["findStripesFiltered","$kDb"],
      '_$_qwi':["adjustSize","$qFb"],
      '_$_kzi':["getDraggedStripe","$NGb"],
      '_$_caj':["createPreviewTable","$fHb"],
      '_$_taj':["createClickInputMode","$vHb"],
      '_$_mbj':["createStripeSelection","$OHb"],
      '_$_kcj':["createKeyboardInputMode","$nIb"],
      '_$_udj':["createStripeDropInputMode","$WIb"],
      '_$_vdj':["createTextEditorInputMode","$XIb"],
      '_$_oej':["createReparentStripeHandler","$oJb"],
      '_$_pej':["createResizeStripeInputMode","$pJb"],
      '_$_dfj':["createReparentStripeInputMode","$DJb"],
      '_$_jhj':["onDragged","$IKb"],
      '_$_aij':["onDragging","$XKb"],
      '_$_ijj':["onLabelAdded","$zLb"],
      '_$_fkj':["onDeletedItem","$VLb"],
      '_$_kkj':["onDragStarted","$ZLb"],
      '_$_cmj':["onDragCanceled","$KMb"],
      '_$_gmj':["onDragFinished","$LMb"],
      '_$_imj':["onDragStarting","$MMb"],
      '_$_tnj':["onDragCanceling","$rNb"],
      '_$_vnj':["onDragFinishing","$sNb"],
      '_$_znj':["onStripeChanged","$wNb"],
      '_$_boj':["onStripeCreated","$xNb"],
      '_$_koj':["shouldBeDeleted","$FNb"],
      '_$_srj':["onDeletedSelection","$jPb"],
      '_$_wrj':["onLabelTextChanged","$nPb"],
      '_$_btj':["onDeletingSelection","$PPb"],
      '_$_jtj':["onValidateLabelText","$VPb"],
      '_$_qtj':["shouldLabelBeEdited","$aQb"],
      '_$_ouj':["shouldInstallCommand","$yQb"],
      '_$_rxj':["createSourceGhostVisualization","$XRb"],
      '_$_ezj':["isValidBegin","$JSb"],
      '_$_kck':["onLabelTextEdited","$oUb"],
      '_$_wck':["getTargetSubregion","$yUb"],
      '_$_cek':["getPreviewTableLayout","$fVb"],
      '_$_cfk':["onClickInputModeChanged","$EVb"],
      '_$_dfk':["onClickInputModeClicked","$FVb"],
      '_$_wfk':["createResizeVisualization","$XVb"],
      '_$_ngk':["onKeyboardInputModeChanged","$mWb"],
      '_$_bhk':["onStripeDropInputModeChanged","$AWb"],
      '_$_dhk':["onTextEditorInputModeChanged","$BWb"],
      '_$_hhk':["onClickInputModeDoubleClicked","$FWb"],
      '_$_qhk':["createTargetGhostVisualization","$NWb"],
      '_$_vhk':["onReparentStripeHandlerChanged","$SWb"],
      '_$_whk':["onResizeStripeInputModeChanged","$TWb"],
      '_$_oik':["onReparentStripeInputModeChanged","$lXb"],
      '_$_cmk':["updateTargetVisualizationBounds","$YYb"],
      '_$_xnk':["updateSourceVisualization","$SZb"],
      '_$_hok':["createStripe","$cac"],
      '_$_kok':["determineGesture","$fac"],
      '_$_rok':["updateTargetVisualization","$mac"],
      '_$_gcl':["ResizeStripeInputMode","RUB"],
      '_$_hcl':["IReparentStripeHandler","SUB"],
      '_$_icl':["ReparentStripeHandler","TUB"],
      '_$_jcl':["ReparentStripeInputMode","UUB"],
      '_$_kcl':["StripeDropInputMode","VUB"],
      '_$_lcl':["ReparentStripePositionHandler","WUB"],
      '_$_mcl':["TableEditorInputMode","XUB"],
      '_$_ncl':["TableReshapeHandler","YUB"],
      '_$$_fpb':["clickInputMode","$MN"],
      '_$$_ipb':["deletableItems","$YN"],
      '_$$_aqb':["selectableItems","$yQ"],
      '_$$_erb':["keyboardInputMode","$aT"],
      '_$$_orb':["labelAddingAllowed","$wU"],
      '_$$_qrb':["labelEditableItems","$xU"],
      '_$$_csb':["labelEditingAllowed","$PV"],
      '_$$_jsb':["stripeDropInputMode","$xW"],
      '_$$_lsb':["textEditorInputMode","$AW"],
      '_$$_osb':["clickSelectableItems","$VW"],
      '_$$_usb':["keyboardModePriority","$wX"],
      '_$$_btb':["autoRemoveEmptyLabels","$rY"],
      '_$$_jtb':["resizeStripeInputMode","$aZ"],
      '_$$_mtb':["clickInputModePriority","$qZ"],
      '_$$_ntb':["clickSelectableRegions","$rZ"],
      '_$$_stb':["draggedRecognizerTouch","$zZ"],
      '_$$_ztb':["pressedRecognizerTouch","$XZ"],
      '_$$_fub':["releasedRecognizerTouch","$Fab"],
      '_$$_gub':["reparentStripeInputMode","$Gab"],
      '_$$_kub':["multiSelectionRecognizer","$sbb"],
      '_$$_xub':["textEditorInputModePriority","$adb"],
      '_$$_avb':["resizeStripeInputModePriority","$Adb"],
      '_$$_bvb':["synchronizeWithGraphSelection","$Cdb"],
      '_$$_dvb':["reparentStripeInputModePriority","$Zdb"],
      '_$$_edc':["yfiles.input","Root"]
    },yfiles.mappings);
  }
  return undefined;
});
