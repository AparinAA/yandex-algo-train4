// #include <bits/stdc++.h>
#include <iostream>
#include <fstream>
#include <queue>
#include <vector>

#define ll = long long;

using namespace std;

bool dijkstra(vector< vector<vector<int> > > &adjs, vector<int> &dist, int n, int weight) {
    priority_queue<pair<int,int> > q;
    q.push({0,1});
	dist[1] = 0;

	while (q.size()) {
        pair<int,int> temp = q.top();
        q.pop();

		int fT = (-1) * temp.first;
        int from = temp.second;

		if (dist[from] < fT) {
			continue;
		}

		for (vector<int> &cur : adjs[from]) {
            int to = cur[0];
            int t = cur[1];
            int w = cur[2];

			if (w >= weight && t + fT <= 1440 && dist[to] > t + fT) {
				q.push({ (-1) * (t + fT), to});
				dist[to] = t + fT;
			}
		}
	}

	return dist[n] != INT32_MAX;
}

int main(){
    freopen("transfer.in","r",stdin);
    freopen("transfer.out","w",stdout);

    int n, m;
    int a,b,t,w;

    cin >> n >> m;

    vector< vector<vector<int> > > adjs(n+1);
    vector<int> dist(n+1, INT32_MAX);

    while (cin >> a >> b >> t >> w) {
        adjs[a].push_back({b,t,w});
        adjs[b].push_back({a,t,w});
    }

    int l = 0;
    int r = 10000000;

    while ( l < r ) {
        int c = (l+r+1) >> 1;

        for ( int i = 0; i < n+1; i++ ) {
            dist[i] = INT32_MAX;
        }

        if ( dijkstra(adjs, dist, n, c * 100 + 3000000) ) {
            l = c;
        } else {
            r = c - 1;
        }
    }

    cout << l;

    return 0;
}