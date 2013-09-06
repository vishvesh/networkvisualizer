(typeof define=='function'?define:(function(dependencies, fn){fn();}))(['yfiles/lang'],function(){
    yfiles.module("demo.yfiles", function(exports) {
        /**
         * This class is based on {@link yfiles.input.AbstractPortCandidateProvider}
         * which is an implementation of interface .
         * It is used to query {@link yfiles.input.IPortCandidate}s for a specific
         * {@link yfiles.graph.IPortOwner}.
         * This specific implementation returns a list of port candidates that are
         * the equivalent to the node's unconnected ports.
         */
        /*public*/ exports.PortCandidateProvider = new yfiles.ClassDefinition(function() {
            return {

        '$extends': yfiles.input.AbstractPortCandidateProvider,

        'constructor': function(/*yfiles.graph.INode*/ node) {
            yfiles.input.AbstractPortCandidateProvider.call(this);
            this.$node = node;
        },

        '$node': null,

        /**
         * Creates an enumeration of possible port candidates, in this
         * case one port candidate for each of the node's unconnected
         * ports in the same location as the port.
         * This method is used to provide the same candidates for all
         * use-cases. It is used as a fallback if methods <pre>GetSourcePortCandidates()</pre>
         * and <pre>GetTargetPortCandidates()</pre> aren't implemented.
         */
        'getPortCandidates': function(/*yfiles.input.IInputModeContext*/ context) {
            var /*yfiles.collections.List<yfiles.input.IPortCandidate>*/ candidates = new yfiles.collections.List/*<yfiles.input.IPortCandidate>*/();
            var /*yfiles.graph.IGraph*/ graph = context.getGraph();
            if (graph !== null) {
                var /*yfiles.util.IEnumerator*/ tmpEnumerator = this.$node.ports.getEnumerator();
                while (tmpEnumerator.moveNext()) {
                    var /*yfiles.graph.IPort*/ port = tmpEnumerator.current;
                    {
                        var /*yfiles.input.DefaultPortCandidate*/ portCandidate = new yfiles.input.DefaultPortCandidate.FromPort(port);
                        portCandidate.validity = yfiles.input.PortCandidateValidity.VALID;
                        candidates.add(portCandidate);
                    }
                }
            }

            return candidates;
        }

    };
})})});
