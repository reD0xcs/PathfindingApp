/**
 * Reprezintă un nod al unei liste dublu înlănțuite.
 * @class
 */
class Node {
    /**
     * Constructor pentru un nod cu o anumită valoare.
     * @constructor
     * @param {*} data - Valoarea nodului.
     */
    constructor(data) {
        this.data = data;
        this.prev = null; // Referință către nodul precedent
        this.next = null; // Referință către nodul următor
    }
}

/**
 * Reprezintă o listă dublu înlănțuită.
 * @class
 */
class DoublyLinkedList {
    /**
     * Constructor pentru lista dublu înlănțuită.
     * @constructor
     */
    constructor() {
        this.head = null; // Referință către primul nod din listă
        this.tail = null; // Referință către ultimul nod din listă
    }

    /**
     * Adaugă un nou nod la sfârșitul listei.
     * @param {*} data - Valoarea nodului de adăugat.
     */
    addToBack(data) {
        const newNode = new Node(data);

        // Verificăm dacă lista este goală
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
    }

    /**
     * Elimină primul nod din listă și returnează valoarea acestuia.
     * @returns {*} - Valoarea primului nod eliminat.
     */
    removeFromFront() {
        if (!this.head) return null; // Lista este deja goală

        const removedNode = this.head;

        // Verificăm dacă există un singur nod în listă
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
            this.head.prev = null;
        }

        return removedNode.data;
    }

    /**
     * Verifică dacă lista este goală.
     * @returns {boolean} - true dacă lista este goală, altfel false.
     */
    isEmpty() {
        return !this.head;
    }
}

export default DoublyLinkedList;