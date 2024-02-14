export class MinBinaryHeap {
    constructor() {
        // Inițializarea heap-ului ca un șir gol
        this.heap = [];
    }

    /**
     * Adaugă un element nou în heap cu o anumită prioritate.
     * După adăugare, se apelează bubbleUp() pentru a menține
     * proprietatea de heap minim.
     * @param {*} element - Elementul de adăugat în heap.
     * @param {number} priority - Prioritatea asociată elementului.
     */
    enqueue(element, priority) {
        this.heap.push({ element, priority });
        this.bubbleUp();
    }

    /**
     * Extrage și returnează elementul cu cea mai mică prioritate din heap.
     * După extragere, se apelează bubbleDown() pentru a menține
     * proprietatea de heap minim.
     * @returns {object} - Elementul cu cea mai mică prioritate.
     */
    dequeue() {
        const min = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.bubbleDown();
        }
        return min;
    }

    /**
     * Verifică dacă heap-ul este gol.
     * @returns {boolean} - true dacă heap-ul este gol, altfel false.
     */
    isEmpty() {
        return this.heap.length === 0;
    }

    /**
     * Menține proprietatea de heap minim prin rearanjarea elementelor în sus.
     */
    bubbleUp() {
        let index = this.heap.length - 1;
        const element = this.heap[index];
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.heap[parentIndex];
            if (element.priority >= parent.priority) break;
            this.heap[parentIndex] = element;
            this.heap[index] = parent;
            index = parentIndex;
        }
    }

    /**
     * Menține proprietatea de heap minim prin rearanjarea elementelor în jos.
     */
    bubbleDown() {
        let index = 0;
        const length = this.heap.length;
        const element = this.heap[0];
        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIndex < length) {
                leftChild = this.heap[leftChildIndex];
                if (leftChild.priority < element.priority) {
                    swap = leftChildIndex;
                }
            }

            if (rightChildIndex < length) {
                rightChild = this.heap[rightChildIndex];
                if (
                    (swap === null && rightChild.priority < element.priority) ||
                    (swap !== null && rightChild.priority < leftChild.priority)
                ) {
                    swap = rightChildIndex;
                }
            }

            if (swap === null) break;
            this.heap[index] = this.heap[swap];
            this.heap[swap] = element;
            index = swap;
        }
    }
}
