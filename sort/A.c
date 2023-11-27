// partition с тремя указателями
#include <stdlib.h>
#include <stdio.h>

int partition(int *arr, int n, int pivot, int x);
void swap(int *a, int *b);

int main(void)
{
    FILE *in = fopen("input.txt", "r");
    if (in == NULL)
    {
        printf("Input opened with fail!");
        return 1;
    }

    FILE *out = fopen("output.txt", "w");
    if (out == NULL)
    {
        printf("Output opened with fail!");
        fclose(in);
        return 1;
    }

    int N = 0, i = 0, x = 0, a = 0;
    int *arr;

    fscanf(in, "%d", &N);

    arr = (int *)malloc(sizeof(int) * N);

    for (i = 0; i < N; i++)
    {
        if (fscanf(in, "%d", &a) == 1)
        {
            arr[i] = a;
        }
        else
        {
            return 1;
        }
    }

    fscanf(in, "%d", &x);

    int p = partition(arr, N, x, -1);

    fprintf(out, "%d\n%d", p, N - p);

    free(arr);
    fclose(in);
    fclose(out);
    return 0;
}

int partition(int *arr, int n, int pivot, int x)
{
    int G = -1, E = x, i = 0;

    for (i = 0; i < n; i++)
    {
        if (arr[i] < pivot)
        {
            if (E != -1)
            {
                swap(&arr[i], &arr[E]);
                if (G != -1)
                {
                    swap(&arr[i], &arr[G]);
                    G++;
                }
                E++;
            }
            else
            {
                if (G != -1)
                {
                    swap(&arr[i], &arr[G]);
                    G++;
                }
            }
        }
        else if (arr[i] == pivot)
        {
            if (E != -1)
            {
                if (G != -1)
                {
                    swap(&arr[i], &arr[G]);
                    G++;
                }
            }
            else
            {
                if (G != -1)
                {
                    swap(&arr[i], &arr[G]);
                    E = G;
                    G++;
                }
                else
                {
                    E = i;
                }
            }
        }
        else
        { // arr[i] > pivot
            if (G == -1)
            {
                G = i;
            }
        }
    }

    if (E == -1)
    {
        if (G != -1)
        {
            return G;
        }
        else
        {
            return n;
        }
    }

    return E;
}

void swap(int *a, int *b)
{
    int temp = *b;
    *b = *a;
    *a = temp;
}