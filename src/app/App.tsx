import { useCallback, useEffect, useMemo, useState } from 'react';
import { stacks, applyStackTheme, applyPrintPageSize, findDocument, canvasSize } from './stacks';
import type { LoadedStack } from './stacks';
import { exportInfo1Merged } from './exportInfo1';
import { Sidebar } from './components/Sidebar';
import { Landing } from './Landing';

type Route =
  | { view: 'landing' }
  | { view: 'stack'; stackId: string };

function readRouteFromUrl(): Route {
  if (typeof window === 'undefined') return { view: 'landing' };
  const params = new URLSearchParams(window.location.search);
  const stackId = params.get('stack');
  if (stackId && stacks.some(s => s.id === stackId)) {
    return { view: 'stack', stackId };
  }
  return { view: 'landing' };
}

function pushRoute(route: Route) {
  if (typeof window === 'undefined') return;
  const url = route.view === 'landing'
    ? `${window.location.pathname}`
    : `${window.location.pathname}?stack=${encodeURIComponent(route.stackId)}`;
  window.history.pushState({}, '', url);
}

export default function App() {
  const [route, setRoute] = useState<Route>(() => readRouteFromUrl());

  useEffect(() => {
    const onPop = () => setRoute(readRouteFromUrl());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((next: Route) => {
    pushRoute(next);
    setRoute(next);
  }, []);

  useEffect(() => {
    if (route.view === 'landing') {
      applyStackTheme(undefined);
      applyPrintPageSize(undefined);
    }
  }, [route]);

  if (route.view === 'landing') {
    return <Landing onOpen={id => navigate({ view: 'stack', stackId: id })} />;
  }
  return <StackViewer stackId={route.stackId} onBack={() => navigate({ view: 'landing' })} />;
}

interface StackViewerProps {
  stackId: string;
  onBack: () => void;
}

function StackViewer({ stackId, onBack }: StackViewerProps) {
  const activeStack: LoadedStack | undefined = useMemo(
    () => stacks.find(s => s.id === stackId),
    [stackId],
  );

  const firstDoc = activeStack?.binders.flatMap(b => b.documents)[0];
  const [activeDocumentId, setActiveDocumentId] = useState<string>(firstDoc?.id ?? '');
  const [printBinderId, setPrintBinderId] = useState<string>(
    activeStack?.binders.find(b => b.id === 'technical')?.id ?? activeStack?.binders[0]?.id ?? '',
  );
  const [activePdf, setActivePdf] = useState<string | null>(null);

  useEffect(() => {
    applyStackTheme(activeStack);
    applyPrintPageSize(activeStack?.format);
  }, [activeStack]);

  const handleExport = useCallback(async (binderId: string) => {
    if (!activeStack) return;
    const binder = activeStack.binders.find(b => b.id === binderId);
    if (!binder) return;

    if (binder.attachments && binder.attachments.length > 0 && binder.documents.length === 1) {
      const firstDoc = binder.documents[0];
      setActiveDocumentId(firstDoc.id);
      setActivePdf(null);
      await new Promise(r => setTimeout(r, 300));
      await exportInfo1Merged(binder.attachments);
      return;
    }

    setPrintBinderId(binderId);
    setTimeout(() => window.print(), 50);
  }, [activeStack]);

  const handleDocumentChange = useCallback((id: string) => {
    setActiveDocumentId(id);
    setActivePdf(null);
  }, []);

  if (!activeStack) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ background: 'var(--lx-bg)', color: 'var(--lx-text-muted)' }}
      >
        <p className="text-[13px]">
          Stack <code style={{ color: 'var(--lx-text)' }}>{stackId}</code> not found.
        </p>
        <button
          onClick={onBack}
          className="text-[12px] px-3.5 py-2 rounded-[10px] font-medium"
          style={{ background: 'var(--lx-accent)', color: 'white' }}
        >
          Back to stacks
        </button>
      </div>
    );
  }

  const { w, h } = canvasSize(activeStack.format);
  const located = findDocument(activeStack, activeDocumentId);
  const activePages = located?.document.pages ?? [];
  const isInfoBinder = located?.binder.attachments && located.binder.attachments.length > 0;

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--lx-bg)' }}>
      <Sidebar
        stack={activeStack}
        activeDocumentId={activeDocumentId}
        onDocumentChange={handleDocumentChange}
        onExport={handleExport}
        activePdf={activePdf}
        onPdfPreview={setActivePdf}
        onBack={onBack}
      />

      <main
        className="lx-scroll flex-1 ml-72 p-8 overflow-y-auto print:hidden"
        style={{ background: 'var(--lx-bg)' }}
      >
        {activePdf ? (
          <div className="flex flex-col items-center py-4 h-full">
            <iframe
              src={activePdf}
              className="w-full max-w-[900px] rounded-lg shadow-2xl"
              style={{ height: 'calc(100vh - 80px)', border: 'none' }}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-8 py-8">
            {activePages.map((PageComponent, i) => (
              <div
                key={i}
                className="bg-white shadow-2xl"
                style={{ width: w, minHeight: h }}
                {...(isInfoBinder ? { 'data-info-page': '' } : {})}
              >
                <PageComponent />
              </div>
            ))}
          </div>
        )}
      </main>

      <div className="hidden print:block" data-format={activeStack.format}>
        {activeStack.binders
          .find(b => b.id === printBinderId)
          ?.documents.flatMap(doc =>
            doc.pages.map((PageComponent, i) => (
              <div key={`${doc.id}-${i}`} className="print-page">
                <PageComponent />
              </div>
            )),
          )}
      </div>
    </div>
  );
}
