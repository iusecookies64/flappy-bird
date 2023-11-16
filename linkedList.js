class Node{
    constructor(element)
    {
        this.data = element;
        this.next = null;
    }
}

class LinkedList {
    constructor()
    {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    addElement = function(element) {
        if(this.head == null)
        {
            this.head = new Node(element);
            this.tail = this.head;
        }
        else
        {
            this.tail.next = new Node(element);
            this.tail = this.tail.next;
        }
        this.length++;
    }

    removeHead()
    {
        if(this.head == null) return;
        this.head = this.head.next;
        this.length--;
    }

    clear()
    {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
}