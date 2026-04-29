import { useCallback, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  MarkerType,
  Handle,
  Position,
} from 'reactflow';
import type { Node, Edge, NodeProps } from 'reactflow';
import 'reactflow/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import type { ArchNode } from '../../types';

const nodeTypeColors: Record<string, { bg: string; border: string; text: string }> = {
  input: { bg: '#06b6d410', border: '#06b6d440', text: '#06b6d4' },
  process: { bg: '#3b82f610', border: '#3b82f640', text: '#3b82f6' },
  ai: { bg: '#8b5cf610', border: '#8b5cf640', text: '#8b5cf6' },
  output: { bg: '#10b98110', border: '#10b98140', text: '#10b981' },
  database: { bg: '#f59e0b10', border: '#f59e0b40', text: '#f59e0b' },
  monitor: { bg: '#ef444410', border: '#ef444440', text: '#ef4444' },
};

function CustomNode({ data }: NodeProps) {
  const colors = nodeTypeColors[data.nodeType] || nodeTypeColors.process;
  return (
    <div
      className="rounded-xl border px-4 py-3 min-w-48 cursor-pointer transition-all duration-200 hover:shadow-lg"
      style={{
        background: `linear-gradient(135deg, #0f172a, #1e293b)`,
        borderColor: colors.border,
        boxShadow: `0 0 0 0px ${colors.text}30`,
      }}
    >
      <Handle type="target" position={Position.Top} style={{ background: colors.text, border: 'none', width: 8, height: 8 }} />
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full" style={{ background: colors.text, boxShadow: `0 0 6px ${colors.text}` }} />
        <span className="text-sm font-semibold text-white">{data.label}</span>
      </div>
      {data.description && (
        <p className="text-xs text-slate-400 mt-1 leading-snug">{data.description}</p>
      )}
      <Handle type="source" position={Position.Bottom} style={{ background: colors.text, border: 'none', width: 8, height: 8 }} />
    </div>
  );
}

const nodeTypes = { custom: CustomNode };

interface ArchitectureDiagramProps {
  nodes: ArchNode[];
  className?: string;
}

function buildReactFlowData(archNodes: ArchNode[]) {
  const nodes: Node[] = archNodes.map((node) => ({
    id: node.id,
    type: 'custom',
    position: node.position,
    data: {
      label: node.label,
      description: node.description,
      nodeType: node.type,
    },
  }));

  const edges: Edge[] = [];
  archNodes.forEach((node) => {
    node.connections.forEach((targetId) => {
      edges.push({
        id: `${node.id}-${targetId}`,
        source: node.id,
        target: targetId,
        animated: true,
        style: { stroke: '#3b82f6', strokeWidth: 1.5 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' },
      });
    });
  });

  return { nodes, edges };
}

export default function ArchitectureDiagram({ nodes: archNodes, className = '' }: ArchitectureDiagramProps) {
  const { nodes: initialNodes, edges: initialEdges } = buildReactFlowData(archNodes);
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<ArchNode | null>(null);

  const onNodeClick = useCallback(
    (_: unknown, node: Node) => {
      const archNode = archNodes.find((n) => n.id === node.id);
      setSelectedNode(archNode || null);
    },
    [archNodes]
  );

  return (
    <div className={`relative rounded-xl overflow-hidden border border-border-subtle ${className}`}>
      <div style={{ height: 500 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          attributionPosition="bottom-right"
        >
          <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="#1e293b" />
          <Controls />
        </ReactFlow>
      </div>

      {/* Node detail tooltip */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 left-4 right-4 bg-bg-secondary border border-border rounded-xl p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-text-primary font-semibold text-sm">{selectedNode.label}</h4>
                <p className="text-text-secondary text-xs mt-1">{selectedNode.description}</p>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-text-muted hover:text-text-primary text-lg leading-none"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
