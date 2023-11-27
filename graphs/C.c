#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>

void swap (long int *a, long int *b);
void addToHeap (long int *heap, long int *len, long int *t, long int l, long int pos);
void popTopHeap (long int *heap, long int *t, long int *ans1, long int *ans2);

void swap (long int *a, long int *b) {
    long int temp;
    temp = *a;
    *a = *b;
    *b = temp;
}

void addToHeap (long int *heap, long int *len, long int *t, long int l, long int pos) {

    long int top = *t;
    long int lenHeap = *len;

    if ( lenHeap <= top + 1) {
        // prlong intf("%li %li\n", lenHeap, top);
        long int *heapNew = (long int *)malloc( sizeof(long int) * 2 * ( lenHeap + 1) );
        long int i = 0;
        
        for ( i = 0; i < lenHeap; i++ ) {
            heapNew[i] = heap[i];
        }

        lenHeap = 2 * lenHeap + 2;

        heap = heapNew;

        free(heapNew);
    }
    
    heap[2*top] = l;
    heap[2*top+1] = pos;
    
    top++;
    *t = top;
    *len = lenHeap;
    
    long int child = top - 1;
    long int parent = (child - 1) / 2;

    while ( child > 0 && heap[2*child] < heap[2*parent] ) {
        swap(&heap[2*child], &heap[2*parent]);
        swap(&heap[2*child+1], &heap[2*parent+1]);

        child = parent;
        parent = (child - 1) / 2;
    }
}

void popTopHeap (long int *heap, long int *t, long int *ans1, long int *ans2) {
    long int top = *t;
    
    *ans1 = heap[0];
    *ans2 = heap[1];
    heap[0] = heap[2 * (top-1)];
    heap[1] = heap[2 * (top-1) + 1];
    long int pos = 0;

    while ( 2 * pos + 2 < top ) {
        long int minChild = 2 * pos + 1;

        if ( heap[ 2 * minChild ] > heap[2 * (2 * pos + 2)] ) {
            minChild = 2 * pos + 2;
        }

        if ( heap[ 2 * minChild ] < heap[ 2 * pos ] ) {
            swap(&heap[2*minChild],&heap[2*pos]);
            swap(&heap[2*minChild+1],&heap[2*pos+1]);

            pos = minChild;
        } else {
            break;
        }
    }

    top--;
    *t = top;
}

int main (void) {
    FILE *in = fopen("input.txt", "rt");
    FILE *out = fopen("output.txt","w");

    long int N=0, K=0, S=0, F=0;
    fscanf(in, "%li", &N);
    fscanf(in, "%li", &K);
    
    long int i = 0, j = 0;
    long int MAX = INT32_MAX;
    long int *matrix = (long int *)malloc( 2 * sizeof(long int) * N * N );
    long int *visited = (long int *)malloc( sizeof(long int) * N );
    long int *dist = (long int *)malloc( sizeof(long int) * N);
    long int front = 0;
    long int last = 0;
    long int cur = 0;

    for ( i = 0; i < N; i++ ) {
        for ( j = 0; j < N; j++ ) {
            matrix[i * N + j] = -1;
        }
    }

    long int a = 0;
    long int b = 0;
    long int l = 0;
    
    for ( i = 0; i < K; i++ ) {
        fscanf(in, "%li", &a);
        fscanf(in, "%li", &b);
        fscanf(in, "%li", &l);
        matrix[ (b-1) * N + (a-1) ] = l;
        matrix[ (b-1) + (a-1) * N ] = l;
    }

    fscanf(in, "%li", &S);
    fscanf(in, "%li", &F);

    for ( i = 0; i < N; i++ ) {
        visited[i] = 0;
        dist[i] = MAX;
    }

    dist[S-1] = 0;

    long int temp = 0;
    long int lenHeap = 2;
    long int top = 0;
    long int ans1 = 0;
    long int ans2 = 0;

    long int *heap = (long int *)malloc(sizeof(long int) * lenHeap);

    addToHeap(heap, &lenHeap, &top, 0, S-1);
    while ( top > 0 ) {
        popTopHeap(heap, &top, &ans1, &ans2);
        if ( visited[ans2] == 1 || dist[ans2] < ans1 ) {
            continue;
        }

        visited[ans2] = 1;
        for ( i = 0; i < N; i++ ) {
            if ( i != ans2 && matrix[ans2 * N + i] > 0 && dist[i] > dist[ans2] + matrix[ans2 * N + i] ) {
                dist[i] = dist[ans2] + matrix[ans2 * N + i];

                if ( visited[i] == 0 ) {
                    addToHeap(heap, &lenHeap, &top, dist[i], i);
                }
            }
        }
    }

    long int ans = dist[F-1] == MAX ? -1 : dist[F-1];

    fprintf(out, "%li", ans);
    
    fclose(in);
    fclose(out);
    free(dist);
    free(visited);
    free(matrix);

    return 0;
}