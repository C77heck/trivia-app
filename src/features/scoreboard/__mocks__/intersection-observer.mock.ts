class IntersectionObserverMock {
    observe() {
    }

    unobserve() {
    }

    disconnect() {
    }

    root: Element | null = null;
    rootMargin: string = '';
    thresholds: number[] = [];
    takeRecords: () => IntersectionObserverEntry[] = () => [];
}

export default IntersectionObserverMock;
