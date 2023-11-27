// #include<bits/stdc++.h>
#include <iostream>
#include <vector>
#include <fstream>
#include <queue>
#include <stack>

using namespace std;
using ll = long long;

void dijkstraToDist(int start, vector<vector<pair<int, int> > > *paths, vector<int> *dist)
{
    priority_queue<pair<int, int> > heap;
    dist->at(start) = 0;
    pair<int, int> temp(0, start);

    heap.push(temp);

    while (!heap.empty())
    {
        temp = heap.top();
        heap.pop();

        if (dist->at(temp.second) < -temp.first)
        {
            continue;
        }

        for (pair<int, int> &adj : paths->at(temp.second))
        {
            if (dist->at(adj.first) > dist->at(temp.second) + adj.second)
            {
                dist->at(adj.first) = dist->at(temp.second) + adj.second;

                // pair<int, int> cur(-dist->at(adj.first), adj.first);
                heap.push({-dist->at(adj.first), adj.first});
            }
        }
    }
}

void BFS(int start, double v, vector<vector<pair<int, int> > > *paths, vector<double> *dist, vector<bool> *visited, vector<int> *prev, stack<int> *q)
{
    
    dist->at(start) = 0;

    q->push(start);

    while (!q->empty())
    {
        int temp = q->top();
        q->pop();

        if (visited->at(temp))
        {
            continue;
        }

        for (pair<int, int> &adj : paths->at(temp))
        {
            int to = adj.first;
            int d = adj.second;

            if (v * dist->at(to) > v * dist->at(temp) + double(d))
            {
                dist->at(to) = dist->at(temp) + double(d) / v;
                prev->at(to) = temp;
                if (!visited->at(to))
                {
                    q->push(to);
                }
            }
        }
        visited->at(temp) = true;
    }
}

int main(void)
{
    freopen("input.txt", "r", stdin);
    freopen("output.txt", "w", stdout);

    int N, t, v, u, a, b, s, minArr, index = 1;

    double maxTime = 0;
    cin >> N;

    vector<vector<pair<int, int> > > paths(N + 1);
    vector<vector<int> > drivers(N + 1);
    vector<int> globalGlobalDist(N + 1, INT32_MAX);
    vector<bool> visited(N + 1, false);
    vector<int> dist(N + 1, INT32_MAX);

    vector<double> timesDis(N + 1, INT32_MAX);

    vector<double> times(N + 1, 0);
    vector<vector<int> > allPaths(N + 1);
    vector<int> vis;
    vector<int> prev(N + 1);
    stack<int> q;

    drivers[0].push_back(-1);
    drivers[0].push_back(-1);
    drivers[0].push_back(0);
    for (int i = 1; i < N + 1; i++)
    {
        cin >> t >> v;

        drivers[i].push_back(v);
        drivers[i].push_back(t);
        drivers[i].push_back(i);
    }

    for (int i = 1; i < N; i++)
    {
        cin >> a >> b >> s;
        // pair<int, int> adj1(b, s);
        // pair<int, int> adj2(a, s);

        paths[a].push_back({b,s});
        paths[b].push_back({a,s});
    }

    globalGlobalDist[1] = 0;
    dijkstraToDist(1, &paths, &globalGlobalDist);

    times[0] = -1;
    times[1] = 0;

    for (int i = 2; i < N + 1; i++)
    {
        times[i] = double(drivers[i][1]) + double(globalGlobalDist[i]) / double(drivers[i][0]);
    }

    sort(drivers.begin(), drivers.end(), greater<vector<int> >());

    for (int i = 0; i < N; i++)
    {
        for (int j = 0; j < N + 1; j++)
        {
            visited[j] = false;
            timesDis[j] = INT32_MAX;
            prev[j] = 0;
        }

        minArr = 1;
        u = drivers[i][2];
        t = drivers[i][1];
        v = drivers[i][0];

        prev[u] = -1;
        timesDis[u] = 0;
        
        BFS(u, double(v), &paths, &timesDis, &visited, &prev, &q);

        for (int &vi : vis)
        {
            if (times[vi] + timesDis[vi] < timesDis[minArr] + times[minArr])
            {
                minArr = vi;
            }
        }

        if (times[u] > t + timesDis[minArr] + times[minArr])
        {
            times[u] = t + timesDis[minArr] + times[minArr];
        }

        if (u != 1)
        {
            while (allPaths[u].size() > 0)
            {
                allPaths[u].pop_back();
            }

            for (int &p : allPaths[minArr])
            {
                allPaths[u].push_back(p);
            }

            allPaths[u].push_back(u);
        }

        if (maxTime < times[u])
        {
            maxTime = times[u];
            index = u;
        }

        vis.push_back(u);
    }

    int size = allPaths[index].size();
    int l = 0;
    int r = size - 1;

    while (l < r)
    {
        int temp = allPaths[index][l];
        allPaths[index][l] = allPaths[index][r];
        allPaths[index][r] = temp;
        l++;
        r--;
    }

    allPaths[index].push_back(1);

    printf("%lf\n", maxTime);

    for (int i = 0; i < size + 1; i++)
    {
        cout << allPaths[index][i] << " ";
    }

    return 0;
}