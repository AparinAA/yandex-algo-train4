#include <stdio.h>
#include <stdlib.h>

int main (void) {
    FILE *in = fopen("input.txt", "rt");
    FILE *out = fopen("output.txt","w");

    
    int N=0, S=0, F=0, temp=0;
    fscanf(in, "%d", &N);
    fscanf(in, "%d", &S);
    fscanf(in, "%d", &F);

    int i = 0, j = 0;
    int MAX = 2147483644 / 16;
    int *matrix = (int *)malloc( sizeof(int) * N * N );
    int *visited = (int *)malloc( sizeof(int) * N );
    int *dist = (int *)malloc( sizeof(int) * N);
    int *queue = (int *)malloc( sizeof(int) * N * N);
    int *prev = (int *)malloc( sizeof(int) * N);
    int *result = (int *)malloc( sizeof(int) * N);
    int front = 0;
    int last = 0;
    int cur = 0;

    while ( fscanf(in, "%d", &cur) == 1 ) {
        if ( i < N && j < N ) {
            matrix[i * N + j] = cur;
            j++;
        }

        if ( j == N ) {
            j=0;
            i++;
        }

    }

    for ( i = 0; i < N; i++ ) {
        visited[i] = 0;
        dist[i] = MAX;
        queue[i] = 0;
    }

    dist[S-1] = 0;
    queue[last] = S-1;
    prev[S-1] = -1;

    while ( last > -1 ) {
        temp = queue[last];
        last--;
        visited[temp] = 1;
        for ( i = 0; i < N; i++ ) {
            if ( i != temp && matrix[temp * N + i] > -1 && dist[temp] < MAX) {
                if ( dist[i] > dist[temp] + matrix[temp * N + i] ) {
                    dist[i] = dist[temp] + matrix[temp * N + i];
                    prev[i] = temp;
                }
            }
            
            if ( visited[i] == 0 ) {
                last++;
                queue[last] = i;
            }
        }
    }
    
    if ( dist[F-1] == MAX ) {
        fprintf(out, "%d", -1);
    } else {
        int q = F - 1;
        i = 0;
        while (q != -1) {
            result[i++] = q + 1;
            q = prev[q];
        }

        while (i > 0) {
            fprintf(out, "%d ", result[--i]);
        }
    }
    
    
    fclose(in);
    fclose(out);
    free(dist);
    free(visited);
    free(matrix);
    free(queue);

    return 0;
}