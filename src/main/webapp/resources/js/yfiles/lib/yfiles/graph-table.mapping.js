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
      '_$_dk':["ForColumn","$a"],
      '_$_ek':["ForRow","$a"],
      '_$_fk':["ForStripe","$a"],
      '_$_gk':["isRoot","$a"],
      '_$_hk':["getRoot","$b"],
      '_$_ik':["getIndex","$c"],
      '_$_jk':["getLeaves","$d"],
      '_$_kk':["getParent","$e"],
      '_$_lk':["getChildren","$g"],
      '_$_mk':["getActualSize","$h"],
      '_$_nk':["getDescendants","$i"],
      '_$_ok':["getActualInsets","$j"],
      '_$_pk':["getEffectiveMinSize","$k"],
      '_$_qk':["getAbsoluteBounds","$l"],
      '_$_rk':["registerDynamicUndoSupport","$a"],
      '_$_sk':["unregisterStaticUndoSupport","$b"],
      '_$_tk':["unregisterDynamicUndoSupport","$c"],
      '_$_uk':["registerStaticUndoSupport","$d"],
      '_$_vk':["clear","$a"],
      '_$_wk':["createRootRow","$b"],
      '_$_xk':["createRootColumn","$c"],
      '_$_yk':["getAccumulatedInsets","$d"],
      '_$_zk':["createRootRowWithSize","$e"],
      '_$_al':["createRootRowWithTag","$f"],
      '_$_bl':["createRootRowWithStyle","$g"],
      '_$_cl':["createRow","$h"],
      '_$_dl':["createRootColumnWithSize","$i"],
      '_$_el':["createRootColumnWithTag","$j"],
      '_$_fl':["createRootColumnWithStyle","$k"],
      '_$_gl':["createColumn","$l"],
      '_$_hl':["createLabelStyle","$n"],
      '_$_il':["removeWithResize","$o"],
      '_$_jl':["removeRecursively","$p"],
      '_$_kl':["adjustPreferredSize","$q"],
      '_$_ll':["createLabelModelParameter","$r"],
      '_$_ml':["removeRecursivelyWithResize","$s"],
      '_$_nl':["addLabel","$t"],
      '_$_ol':["createRootRowWithSizeAndTag","$u"],
      '_$_pl':["createRootRowWithSizeAndStyle","$v"],
      '_$_ql':["createRootRowAtIndexWithSize","$w"],
      '_$_rl':["createRootRowWithStyleAndTag","$x"],
      '_$_sl':["createRowWithSize","$y"],
      '_$_tl':["createRowWithTag","$z"],
      '_$_ul':["createRowWithStyle","$A"],
      '_$_vl':["setColumnParent","$B"],
      '_$_wl':["setRowParent","$C"],
      '_$_xl':["createGrid","$D"],
      '_$_yl':["createRootColumnWithSizeAndTag","$E"],
      '_$_zl':["createRootColumnWithSizeAndStyle","$F"],
      '_$_am':["createRootColumnAtIndexWithSize","$G"],
      '_$_bm':["createRootColumnWithStyleAndTag","$H"],
      '_$_cm':["createColumnWithSize","$I"],
      '_$_dm':["createColumnWithTag","$J"],
      '_$_em':["createColumnWithStyle","$K"],
      '_$_fm':["addLabelWithTag","$L"],
      '_$_gm':["addLabelWithParameter","$M"],
      '_$_hm':["createRootRowWithSizeStyleAndTag","$N"],
      '_$_im':["createRootRowAtIndexWithSizeAndTag","$O"],
      '_$_jm':["createRowWithSizeAndTag","$P"],
      '_$_km':["createRowWithSizeAndStyle","$Q"],
      '_$_lm':["createRowAtIndexWithSize","$R"],
      '_$_mm':["createRowWithStyleAndTag","$S"],
      '_$_nm':["createRootColumnWithSizeStyleAndTag","$T"],
      '_$_om':["createRootColumnAtIndexWithSizeAndTag","$U"],
      '_$_pm':["createRootColumnAtIndexWithSizeAndStyle","$V"],
      '_$_qm':["createColumnWithSizeAndTag","$W"],
      '_$_rm':["createColumnWithSizeAndStyle","$X"],
      '_$_sm':["createColumnAtIndexWithSize","$Y"],
      '_$_tm':["createColumnWithStyleAndTag","$Z"],
      '_$_um':["addLabelWithParameterAndStyle","$ab"],
      '_$_vm':["createRootRowAtIndexWithSizeStyleAndTag","$bb"],
      '_$_wm':["createRowWithSizeStyleAndTag","$cb"],
      '_$_xm':["createRowAtIndexWithSizeAndTag","$db"],
      '_$_ym':["createRowAtIndexWithSizeAndStyle","$eb"],
      '_$_zm':["findStripe","$fb"],
      '_$_an':["findStripes","$gb"],
      '_$_bn':["findStripesInNode","$hb"],
      '_$_cn':["createRootColumnAtIndexWithSizeStyleAndTag","$ib"],
      '_$_dn':["createColumnWithSizeStyleAndTag","$jb"],
      '_$_en':["createColumnAtIndexWithSizeAndTag","$kb"],
      '_$_fn':["createColumnAtIndexWithSizeAndStyle","$lb"],
      '_$_gn':["addLabelWithParameterStyleAndTag","$mb"],
      '_$_hn':["addLabelWithParameterStyleAndPreferredSize","$nb"],
      '_$_in':["createRowAtIndexWithSizeStyleAndTag","$ob"],
      '_$_jn':["createColumnAtIndexWithSizeStyleAndTag","$pb"],
      '_$_kn':["calculatePreferredSize","$qb"],
      '_$_ooc':["rows","$jg"],
      '_$_lqc':["owner","$Cg"],
      '_$_esc':["columns","$Zg"],
      '_$_kvc':["selectedRows","$Ei"],
      '_$_swc':["selectedColumns","$qj"],
      '_$_twc':["selectedStripes","$rj"],
      '_$_eyc':["mixedSelectionAllowed","$Zj"],
      '_$_lyc':["crossTableSelectionAllowed","$jk"],
      '_$_ccd':["getStripeHitTestable","$Al"],
      '_$_ecd':["getFarBorderHitTestable","$Dl"],
      '_$_fcd':["getNearBorderHitTestable","$El"],
      '_$_icd':["getLeadingHeaderHitTestable","$Hl"],
      '_$_jcd':["getTrailingHeaderHitTestable","$Il"],
      '_$_shd':["enumerateHits","$Sn"],
      '_$_tkd':["getVisualCreator","$hp"],
      '_$_sxd':["createParameter","$xu"],
      '_$_bte':["stripe","$TD"],
      '_$_laf':["subregion","$BH"],
      '_$_asf':["stripeSelection","$KQ"],
      '_$_ddg':["tableRenderingOrder","$yW"],
      '_$_yfg':["resizeStripeTemplate","$aY"],
      '_$_jjg':["selectedStripeTemplate","$ZZ"],
      '_$_hlg':["dragSourceStripeTemplate","$cbb"],
      '_$_ilg':["dropTargetStripeTemplate","$dbb"],
      '_$_mxg':["removeUndoSupport","$fhb"],
      '_$_qfh':["isSelectedColumn","$flb"],
      '_$_vfh':["isSelectedRow","$klb"],
      '_$_dwh':["registerUndoSupport","$ysb"],
      '_$_nji':["setSelectedColumn","$Kyb"],
      '_$_sji':["setSelectedRow","$Pyb"],
      '_$_ayi':["getUndoSupport","$gGb"],
      '_$_uzi':["createRowDefaults","$XGb"],
      '_$_vaj':["createColumnDefaults","$xHb"],
      '_$_ibj':["createDefaultRowStyle","$KHb"],
      '_$_rbj':["createDefaultRowInsets","$VHb"],
      '_$_bcj':["createRowLabelDefaults","$eIb"],
      '_$_scj':["createDefaultColumnStyle","$uIb"],
      '_$_jdj':["createColumnLabelDefaults","$LIb"],
      '_$_mdj':["createDefaultColumnInsets","$OIb"],
      '_$_ydj':["createDefaultRowLabelStyle","$ZIb"],
      '_$_xej':["createDefaultColumnLabelStyle","$xJb"],
      '_$_rfj':["createDefaultRowLabelModelParameter","$RJb"],
      '_$_vfj':["createDefaultColumnLabelModelParameter","$VJb"],
      '_$_lgj':["copyRow","$lKb"],
      '_$_uhj':["copyColumn","$RKb"],
      '_$_ajj':["copyDefaults","$tLb"],
      '_$_gjj':["onLabelAdded","$zLb"],
      '_$_glj':["onStripeAdded","$oMb"],
      '_$_qmj':["onItemSelected","$RMb"],
      '_$_rmj':["onLabelChanged","$SMb"],
      '_$_umj':["onLabelRemoved","$TMb"],
      '_$_aoj':["onStripeChanged","$wNb"],
      '_$_gpj':["onItemDeselected","$aOb"],
      '_$_bzj':["findTemplate","$HSb"],
      '_$_bbk':["onStripeRemoved","$GTb"],
      '_$_aek':["createStripeAnimation","$dVb"],
      '_$_del':["TableAnimation","WXB"],
      '_$_eel':["DefaultColumnLookup","YXB"],
      '_$_fel':["DefaultRowLookup","ZXB"],
      '_$_gel':["DefaultStripeLookup","AYB"],
      '_$_hel':["IStripeHitTestHelper","BYB"],
      '_$_iel':["StripeSubregion","CYB"],
      '_$_jel':["StripeSubregionDescriptor","DYB"],
      '_$_kel':["StripeVisualizationType","FYB"],
      '_$_lel':["IStripeInputVisualizationHelper","GYB"],
      '_$_mel':["StripeExtensions","KYB"],
      '_$_nel':["IStripeSelection","NYB"],
      '_$_oel':["StripeSelection","OYB"],
      '_$_pel':["CompositeStripeSelection","PYB"],
      '_$_qel':["Table","QYB"],
      '_$_rel':["StripeEventArgs","RYB"],
      '_$_sel':["TableExtensions","UYB"],
      '_$_tel':["StripeHitTestEnumerator","WYB"],
      '_$$_ge':["FromPosition","$a"],
      '_$$_he':["FromPositionAndModel","$b"],
      '_$$_ie':["Position","$a"],
      '_$$_qbb':["position","$Be"],
      '_$$_adb':["tag","$Wf"],
      '_$$_idb':["rows","$jg"],
      '_$$_kdb':["size","$kg"],
      '_$$_deb':["model","$Ag"],
      '_$$_jeb':["ratio","$Fg"],
      '_$$_meb':["style","$Hg"],
      '_$$_yeb':["insets","$Pg"],
      '_$$_afb':["labels","$Qg"],
      '_$$_kfb':["columns","$Zg"],
      '_$$_rgb':["minimumSize","$ki"],
      '_$$_sgb':["rowDefaults","$oi"],
      '_$$_dhb':["columnDefaults","$Xi"],
      '_$$_khb':["relativeLocation","$zj"],
      '_$$_fqb':["useActualInsets","$QQ"],
      '_$$_tec':["yfiles.canvas","Root"],
      '_$$_uec':["ColumnExtension","XXB"],
      '_$$_vec':["yfiles.markup.common","Root"],
      '_$$_wec':["yfiles.graph","Root"],
      '_$$_xec':["DefaultStripeInputVisualizationHelper","EYB"],
      '_$$_yec':["RowExtension","HYB"],
      '_$$_zec':["StretchStripeLabelModelParameterExtension","IYB"],
      '_$$_afc':["yfiles.markup.ui","Root"],
      '_$$_bfc':["StretchStripeLabelModel","JYB"],
      '_$$_cfc':["yfiles.drawing","Root"],
      '_$$_dfc':["StripeLabelModelParameterExtension","LYB"],
      '_$$_efc':["StripeLabelModel","MYB"],
      '_$$_ffc':["StripeTypes","SYB"],
      '_$$_gfc':["TableExtension","TYB"],
      '_$$_hfc':["TableRenderingOrder","VYB"]
    },yfiles.mappings);
  }
  return undefined;
});
