#include <stdio.h>
#include <stdlib.h>
#define MAX 2147483647

void recursion(int visited, int *matrix, int n, int len, int curV, int *min, int full);
void recursion(int visited, int *matrix, int n, int len, int curV, int *min, int full)
{
    visited |= 1 << curV;

    if (full + 1 == n)
    {

        int w = matrix[curV * n];
        if (*min > len + w)
        {
            *min = len + w;
        }
    }
    else
    {
        for (int i = 0; i < n; i++)
        {
            if (matrix[curV * n + i] > 0)
            {
                int w = matrix[curV * n + i];
                if (!(visited & (1 << i)) && len + w < *min)
                {
                    int route = len + w;
                    recursion(visited, matrix, n, route, i, min, full + 1);
                }
            }
        }
    }

    visited ^= 1 << curV;
}

int main(void)
{
    FILE *in = fopen("input.txt", "r");
    FILE *out = fopen("output.txt", "w");

    int n = 0;

    fscanf(in, "%d", &n);

    int *adjs = (int *)malloc(sizeof(int) * n * n);
    int visited = 0;

    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < n; j++)
        {
            fscanf(in, "%d", &adjs[i * n + j]);
        }
    }

    int best = MAX;

    recursion(visited, adjs, n, 0, 0, &best, 0);

    int ans = best == MAX ? -1 : best;

    fprintf(out, "%d", ans);

    fclose(in);
    fclose(out);
    free(adjs);

    return 0;
}