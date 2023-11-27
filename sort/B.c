// алгоритм быстрой сортировки + сортировка вставкой
// сортировка вставкой для участка массива, который маленький в размере n <= 22

// #include<bits/stdc++.h> //добавлять эти библиотеки в контесте
#include <stdlib.h>
#include <stdio.h>
#include <time.h>

void partition(int *arr, int left, int right, int pivot, int x, int *g, int *e);
void swap(int *a, int *b);
void quickSort(int *arr, int left, int right);
void sortInsert(int *arr, int left, int right);
int median3th(int *arr, int left, int right);
int printToStream(int *arr, int n, FILE *stream);
int readFromStream(int *arr, int n, FILE *stream);

int main(void)
{
    FILE *in = fopen("input.txt", "r");
    if (in == NULL)
    {
        return 1;
    }

    FILE *out = fopen("output.txt", "w");
    if (out == NULL)
    {
        fclose(in);
        return 1;
    }

    int N = 0, i = 0;
    int *arr;
    clock_t start, end;

    fscanf(in, "%d", &N);
    arr = (int *)malloc(sizeof(long int) * N);

    if (readFromStream(arr, N, in) == 0)
    {
        fclose(in);
        fclose(out);
        free(arr);
        return 1;
    }

    // start = clock();
    quickSort(arr, 0, N);
    // end = clock();

    // printf("The time of the work: %lf", (double)((end - start)));

    printToStream(arr, N, out);

    free(arr);
    fclose(in);
    fclose(out);

    return 0;
}

void sortInsert(int *arr, int left, int right)
{
    int i = 0;
    int l = left;
    int temp = 0;

    for (i = left + 1; i < right; i++)
    {
        temp = arr[i];
        l = i;

        while (l > 0 && arr[l - 1] > temp)
        {
            arr[l] = arr[l - 1];
            l--;
        }

        arr[l] = temp;
    }
}

void quickSort(int *arr, int left, int right)
{
    int x = 0;
    int gr = -1;
    int eq = -1;

    if (left < right)
    {
        if (right - left <= 15)
        {
            sortInsert(arr, left, right);
        }
        else
        {
            x = median3th(arr, left, right);

            gr = -1;
            eq = -1;

            partition(arr, left, right, arr[x], x, &gr, &eq);

            quickSort(arr, left, eq);
            quickSort(arr, gr, right);
        }
    }
}

void partition(int *arr, int left, int right, int pivot, int x, int *g, int *e)
{
    int G = *g, E = *e, i = 0;

    for (i = left; i < right; i++)
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

    *g = G == -1 ? right : G;
    *e = E == -1 ? x : E;
}

void swap(int *a, int *b)
{
    int temp = *b;
    *b = *a;
    *a = temp;
}

int median3th(int *arr, int left, int right)
{
    int x = left + rand() % (right - left);

    if (arr[left] > arr[x] && arr[left] < arr[right - 1] || arr[left] < arr[x] && arr[left] > arr[right - 1])
    {
        x = left;
    }
    else if (arr[right - 1] > arr[x] && arr[right - 1] < arr[left] || arr[right - 1] < arr[x] && arr[right - 1] > arr[left])
    {
        x = right - 1;
    }

    return x;
}

int printToStream(int *arr, int n, FILE *stream)
{
    int i = 0;
    for (i = 0; i < n; i++)
    {
        fprintf(stream, "%d ", arr[i]);
    }

    return 1;
}

int readFromStream(int *arr, int N, FILE *stream)
{
    int i = 0;

    for (i = 0; i < N; i++)
    {
        if (fscanf(stream, "%d", &arr[i]) != 1)
        {
            return 0;
        }
    }
    return 1;
}